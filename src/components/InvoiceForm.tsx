import { useEffect, useState } from "react";
import FormField from "./FormField";
import type { Invoice } from "../types/invoice";

type Item = { name: string; quantity: string; price: string };

const emptyItem: Item = { name: "", quantity: "1", price: "" };

type Props = {
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
  invoice?: Invoice;
};

type FormData = {
  senderStreet: string;
  senderCity: string;
  senderPostCode: string;
  senderCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreet: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  invoiceDate: string;
  paymentTerms: string;
  description: string;
};

const emptyForm: FormData = {
  senderStreet: "",
  senderCity: "",
  senderPostCode: "",
  senderCountry: "",
  clientName: "",
  clientEmail: "",
  clientStreet: "",
  clientCity: "",
  clientPostCode: "",
  clientCountry: "",
  invoiceDate: "",
  paymentTerms: "30",
  description: "",
};

const DRAFT_FORM_KEY = "invoiceFormData";
const DRAFT_ITEMS_KEY = "invoiceItemsData";

function readDraft<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_FORM_KEY);
    localStorage.removeItem(DRAFT_ITEMS_KEY);
  } catch {}
}

function genId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const r = () => letters[Math.floor(Math.random() * 26)];
  return `${r()}${r()}${Math.floor(1000 + Math.random() * 9000)}`;
}

export default function InvoiceForm({ onClose, onSave, invoice }: Props) {
  const isEdit = Boolean(invoice);

  const [form, setForm] = useState<FormData>(() => {
    if (invoice) {
      return {
        senderStreet: invoice.senderAddress.street,
        senderCity: invoice.senderAddress.city,
        senderPostCode: invoice.senderAddress.postCode,
        senderCountry: invoice.senderAddress.country,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        clientStreet: invoice.clientAddress.street,
        clientCity: invoice.clientAddress.city,
        clientPostCode: invoice.clientAddress.postCode,
        clientCountry: invoice.clientAddress.country,
        invoiceDate: invoice.createdAt.slice(0, 10),
        paymentTerms: String(invoice.paymentTerms),
        description: invoice.description,
      };
    }
    return readDraft<FormData>(DRAFT_FORM_KEY, emptyForm);
  });

  const [items, setItems] = useState<Item[]>(() => {
    if (invoice) {
      return invoice.items.map((i) => ({
        name: i.name,
        quantity: String(i.quantity),
        price: String(i.price),
      }));
    }
    return readDraft<Item[]>(DRAFT_ITEMS_KEY, [{ ...emptyItem }]);
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  
  useEffect(() => {
    if (isEdit) return;
    try {
      localStorage.setItem(DRAFT_FORM_KEY, JSON.stringify(form));
      localStorage.setItem(DRAFT_ITEMS_KEY, JSON.stringify(items));
    } catch {}
  }, [form, items, isEdit]);

  function set(key: keyof FormData) {
    return (value: string) => setForm((f) => ({ ...f, [key]: value }));
  }

  function updateItem(index: number, key: keyof Item, value: string) {
    setItems((list) =>
      list.map((it, i) => (i === index ? { ...it, [key]: value } : it)),
    );
  }

  function validate() {
    const e: Record<string, string> = {};
    const required: (keyof FormData)[] = [
      "senderStreet",
      "senderCity",
      "senderPostCode",
      "senderCountry",
      "clientName",
      "clientEmail",
      "clientStreet",
      "clientCity",
      "clientPostCode",
      "clientCountry",
      "invoiceDate",
      "description",
    ];
    required.forEach((k) => {
      if (!form[k].trim()) e[k] = "can't be empty";
    });
    if (form.clientEmail && !/^\S+@\S+\.\S+$/.test(form.clientEmail)) {
      e.clientEmail = "invalid email";
    }
    if (items.length === 0) e.items = "An item must be added";
    items.forEach((it, i) => {
      if (!it.name.trim()) e[`item${i}name`] = "can't be empty";
      if (!(Number(it.quantity) > 0)) e[`item${i}quantity`] = "invalid";
      if (!(Number(it.price) > 0)) e[`item${i}price`] = "invalid";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function build(status: Invoice["status"]): Invoice {
    const created = form.invoiceDate || new Date().toISOString().slice(0, 10);
    const due = new Date(created);
    due.setDate(due.getDate() + Number(form.paymentTerms));

    const mapped = items.map(({ name, quantity, price }) => ({
      name,
      quantity: Number(quantity) || 0,
      price: Number(price) || 0,
      total: (Number(quantity) || 0) * (Number(price) || 0),
    }));

    return {
      id: invoice?.id ?? genId(),
      createdAt: created,
      paymentDue: due.toISOString().slice(0, 10),
      description: form.description,
      paymentTerms: Number(form.paymentTerms),
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      status,
      senderAddress: {
        street: form.senderStreet,
        city: form.senderCity,
        postCode: form.senderPostCode,
        country: form.senderCountry,
      },
      clientAddress: {
        street: form.clientStreet,
        city: form.clientCity,
        postCode: form.clientPostCode,
        country: form.clientCountry,
      },
      items: mapped,
      total: mapped.reduce((sum, i) => sum + i.total, 0),
    };
  }

  function handleDiscard() {
    clearDraft();
    onClose();
  }

  function handleSend() {
    if (!validate()) return;
    const status =
      invoice && invoice.status !== "draft" ? invoice.status : "pending";
    clearDraft();
    onSave(build(status));
  }

  function handleDraft() {
    clearDraft();
    onSave(build("draft"));
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit invoice" : "New invoice"}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-y-0 left-25.75 flex w-154 flex-col rounded-r-[20px] bg-white dark:bg-dark-bg"
      >
        <div className="flex-1 overflow-y-auto p-14">
          <h2 className="text-[24px] leading-8 font-bold tracking-[-0.5px] dark:text-white">
            {invoice ? (
              <>
                Edit <span className="text-muted-2">#</span>
                {invoice.id}
              </>
            ) : (
              "New Invoice"
            )}
          </h2>

          <h3 className="mt-12 font-bold text-primary">Bill From</h3>
          <FormField
            className="mt-6"
            label="Street Address"
            name="senderStreet"
            value={form.senderStreet}
            onChange={set("senderStreet")}
            error={errors.senderStreet}
          />
          <div className="mt-6 grid grid-cols-3 gap-6">
            <FormField
              label="City"
              name="senderCity"
              value={form.senderCity}
              onChange={set("senderCity")}
              error={errors.senderCity}
            />
            <FormField
              label="Post Code"
              name="senderPostCode"
              value={form.senderPostCode}
              onChange={set("senderPostCode")}
              error={errors.senderPostCode}
            />
            <FormField
              label="Country"
              name="senderCountry"
              value={form.senderCountry}
              onChange={set("senderCountry")}
              error={errors.senderCountry}
            />
          </div>

          <h3 className="mt-12 font-bold text-primary">Bill To</h3>
          <FormField
            className="mt-6"
            label="Client's Name"
            name="clientName"
            value={form.clientName}
            onChange={set("clientName")}
            error={errors.clientName}
          />
          <FormField
            className="mt-6"
            label="Client's Email"
            name="clientEmail"
            type="email"
            value={form.clientEmail}
            onChange={set("clientEmail")}
            error={errors.clientEmail}
          />
          <FormField
            className="mt-6"
            label="Street Address"
            name="clientStreet"
            value={form.clientStreet}
            onChange={set("clientStreet")}
            error={errors.clientStreet}
          />
          <div className="mt-6 grid grid-cols-3 gap-6">
            <FormField
              label="City"
              name="clientCity"
              value={form.clientCity}
              onChange={set("clientCity")}
              error={errors.clientCity}
            />
            <FormField
              label="Post Code"
              name="clientPostCode"
              value={form.clientPostCode}
              onChange={set("clientPostCode")}
              error={errors.clientPostCode}
            />
            <FormField
              label="Country"
              name="clientCountry"
              value={form.clientCountry}
              onChange={set("clientCountry")}
              error={errors.clientCountry}
            />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6">
            <FormField
              label="Invoice Date"
              name="invoiceDate"
              type="date"
              value={form.invoiceDate}
              onChange={set("invoiceDate")}
              error={errors.invoiceDate}
            />
            <div>
              <label htmlFor="paymentTerms" className="text-muted-2">
                Payment Terms
              </label>
              <select
                id="paymentTerms"
                value={form.paymentTerms}
                onChange={(e) => set("paymentTerms")(e.target.value)}
                className="mt-2 h-12 w-full rounded border border-light-1 bg-white px-5 font-bold dark:border-dark-1 dark:bg-dark-2 dark:text-white"
              >
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
            </div>
          </div>
          <FormField
            className="mt-6"
            label="Project Description"
            name="description"
            value={form.description}
            onChange={set("description")}
            error={errors.description}
          />

          <h3 className="mt-8 text-[18px] font-bold text-[#777F98]">
            Item List
          </h3>
          <ul className="mt-4 flex flex-col gap-4">
            {items.map((it, i) => (
              <li
                key={i}
                className="grid grid-cols-[1fr_64px_100px_60px_20px] items-end gap-4"
              >
                <FormField
                  label="Item Name"
                  name={`item${i}name`}
                  value={it.name}
                  onChange={(v) => updateItem(i, "name", v)}
                  error={errors[`item${i}name`] && " "}
                />
                <FormField
                  label="Qty."
                  name={`item${i}quantity`}
                  value={it.quantity}
                  onChange={(v) => updateItem(i, "quantity", v)}
                  error={errors[`item${i}quantity`] && " "}
                />
                <FormField
                  label="Price"
                  name={`item${i}price`}
                  value={it.price}
                  onChange={(v) => updateItem(i, "price", v)}
                  error={errors[`item${i}price`] && " "}
                />
                <div>
                  <p className="text-muted-2">Total</p>
                  <p className="mt-2 flex h-12 items-center font-bold text-muted">
                    {(Number(it.quantity) * Number(it.price) || 0).toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Remove item"
                  onClick={() =>
                    setItems((l) => l.filter((_, idx) => idx !== i))
                  }
                  className="mb-4 text-muted hover:text-danger"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setItems((l) => [...l, { ...emptyItem }])}
            className="mt-4 h-12 w-full rounded-full bg-[#F9FAFE] font-bold text-muted-2 hover:bg-light-1 dark:bg-dark-2 dark:text-light-1"
          >
            + Add New Item
          </button>

          {Object.keys(errors).length > 0 && (
            <div className="mt-8 text-[10px] text-danger">
              <p>- All fields must be added</p>
              {errors.items && <p>- An item must be added</p>}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between rounded-r-[20px] bg-white px-14 py-8 shadow-[0_-40px_40px_rgba(0,0,0,0.05)] dark:bg-dark-bg">
          {isEdit ? (
            <>
              <span />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-12 rounded-full bg-[#F9FAFE] px-6 font-bold text-muted-2 hover:bg-light-1 dark:bg-dark-2 dark:text-light-1"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSend}
                  className="h-12 rounded-full bg-primary px-6 font-bold text-white hover:bg-primary-light"
                >
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleDiscard}
                className="h-12 rounded-full bg-[#F9FAFE] px-6 font-bold text-muted-2 hover:bg-light-1 dark:bg-dark-2 dark:text-light-1"
              >
                Discard
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDraft}
                  className="h-12 rounded-full bg-sidebar px-6 font-bold text-muted hover:bg-ink"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={handleSend}
                  className="h-12 rounded-full bg-primary px-6 font-bold text-white hover:bg-primary-light"
                >
                  Save &amp; Send
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
