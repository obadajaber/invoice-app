import { useState } from 'react'
import type { InvoiceStatus } from '../types/invoice'
import arrowDown from '../assets/icon-arrow-down.svg'

const options: InvoiceStatus[] = ['draft', 'pending', 'paid']

type Props = {
  selected: InvoiceStatus[]
  onChange: (selected: InvoiceStatus[]) => void
}

export default function FilterDropdown({ selected, onChange }: Props) {
  const [open, setOpen] = useState(false)

  function toggle(status: InvoiceStatus) {
    if (selected.includes(status)) {
      onChange(selected.filter((s) => s !== status))
    } else {
      onChange([...selected, status])
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3.5 font-bold text-ink hover:opacity-70 dark:text-white"
      >
        Filter by status
        <img
          src={arrowDown}
          alt=""
          className={`h-1.25 w-2.25 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul className="absolute top-10 left-1/2 z-10 w-48 -translate-x-1/2 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2 dark:shadow-black/40">
          {options.map((status) => (
            <li key={status} className="mb-4 last:mb-0">
              <label className="flex cursor-pointer items-center gap-3 font-bold capitalize hover:[&>input]:border-primary dark:text-white">
                <input
                  type="checkbox"
                  checked={selected.includes(status)}
                  onChange={() => toggle(status)}
                  className="h-4 w-4 cursor-pointer accent-primary"
                />
                {status}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}