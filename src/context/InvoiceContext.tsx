import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Invoice } from "../types/invoice";
import { invoices as seed } from "../data/invoices";

type InvoiceContextType = {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markPaid: (id: string) => void;
};

const InvoiceContext = createContext<InvoiceContextType | null>(null);
const STORAGE_KEY = "invoices";

function load(): Invoice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Invoice[];
  } catch {}
  return seed;
}


export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    } catch {}
  }, [invoices]);

  const value: InvoiceContextType = {
    invoices,
    addInvoice: (invoice) => setInvoices((list) => [invoice, ...list]),
    updateInvoice: (invoice) =>
      setInvoices((list) =>
        list.map((i) => (i.id === invoice.id ? invoice : i)),
      ),
    deleteInvoice: (id) =>
      setInvoices((list) => list.filter((i) => i.id !== id)),
    markPaid: (id) =>
      setInvoices((list) =>
        list.map((i) => (i.id === id ? { ...i, status: "paid" } : i)),
      ),
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const ctx = useContext(InvoiceContext);
  if (!ctx) throw new Error("useInvoices must be used inside InvoiceProvider");
  return ctx;
}
