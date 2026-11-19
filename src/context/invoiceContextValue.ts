import { createContext } from "react";
import type { Invoice } from "../types/invoice";

export type InvoiceContextType = {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markPaid: (id: string) => void;
};

export const InvoiceContext = createContext<InvoiceContextType | null>(null);