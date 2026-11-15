type Props = {
    label: string
    name: string
    value: string
    onChange: (value: string) => void
    error?: string
    type?: string
    className?: string
}

export default function FormField({
    label, name, value, onChange, error, type = 'text', className = '',
}: Props) {
    return (
        <div className={className}>
            <div className="flex justify-between">
                <label htmlFor={name} className={error ? 'text-danger' : 'text-muted-2'}>
                    {label}
                </label>
                {error && <span className="text-[10px] text-danger">{error}</span>}
            </div>
            <input
                id={name}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`mt-2 h-12 w-full rounded border bg-white px-5 font-bold text-ink outline-none focus:border-primary dark:bg-dark-2 dark:text-white ${error ? 'border-danger' : 'border-light-1 dark:border-dark-1'
                    }`}
            />
        </div>
    )
}