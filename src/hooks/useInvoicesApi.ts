import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  markInvoicePaid,
  updateInvoice,
} from "../api/invoices";
import { ApiError } from "../api/invoices";

export function useInvoicesQuery() {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
    retry: 1,
  });
}

export function useInvoiceQuery(id: string | undefined) {
  return useQuery({
    queryKey: ["invoices", id],
    queryFn: () => getInvoice(id!),
    enabled: Boolean(id),
    retry: (failureCount, error) =>
      !(error instanceof ApiError && error.status === 404) && failureCount < 1,
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInvoice,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

export function useMarkPaid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markInvoicePaid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"], exact: true });
    },
  });
}
