import type { Invoice } from "../types/invoice";

const BASE_URL = "http://localhost:3001/invoices";

export class ApiError extends Error {
  status: number;

  constructor(status: number) {
    super(`Request failed with status ${status}`);
    this.status = status;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new ApiError(res.status);
  }
  return res.json() as Promise<T>;
}

export async function getInvoices(): Promise<Invoice[]> {
  const res = await fetch(BASE_URL);
  const invoices = await handleResponse<Invoice[]>(res);
  return invoices.reverse();
}

export async function getInvoice(id: string): Promise<Invoice> {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse<Invoice>(res);
}

export async function createInvoice(invoice: Invoice): Promise<Invoice> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invoice),
  });
  return handleResponse<Invoice>(res);
}

export async function updateInvoice(invoice: Invoice): Promise<Invoice> {
  const res = await fetch(`${BASE_URL}/${invoice.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invoice),
  });
  return handleResponse<Invoice>(res);
}

export async function deleteInvoice(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  await handleResponse<unknown>(res);
}

export async function markInvoicePaid(id: string): Promise<Invoice> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "paid" }),
  });
  return handleResponse<Invoice>(res);
}
