import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  useInvoiceQuery,
  useDeleteInvoice,
  useMarkPaid,
  useUpdateInvoice,
} from "../hooks/useInvoicesApi";
import InvoiceActions from "../components/InvoiceActions";
import InvoiceInfo from "../components/InvoiceInfo";
import InvoiceItemsTable from "../components/InvoiceItemsTable";
import DeleteModal from "../components/DeleteModal";
import InvoiceForm from "../components/InvoiceForm";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: invoice } = useInvoiceQuery(id);
  const deleteInvoice = useDeleteInvoice();
  const markPaid = useMarkPaid();
  const updateInvoice = useUpdateInvoice();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  if (!invoice) {
    return (
      <div>
        <Link to="/" className="font-bold dark:text-white">
          Go back
        </Link>
        <p className="mt-8 dark:text-white">Invoice not found.</p>
      </div>
    );
  }

  return (
    <div className="pb-20 md:-mx-2 md:-mt-3 md:pb-0 lg:mx-0 lg:mt-0">
      <Link
        to="/"
        className="flex w-fit items-center gap-5 font-bold hover:text-muted-2 lg:gap-6 dark:text-white dark:hover:text-muted-2"
      >
        <svg
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          aria-hidden="true"
        >
          <path d="M6 1L2 5l4 4" stroke="#7C5DFA" strokeWidth="2" />
        </svg>
        Go back
      </Link>

      <InvoiceActions
        status={invoice.status}
        onEdit={() => setShowEdit(true)}
        onDelete={() => setShowDelete(true)}
        onMarkPaid={() => markPaid.mutate(invoice.id)}
      />

      <div className="mt-4 rounded-lg bg-white shadow-sm md:mt-6 lg:mt-4 dark:bg-dark-1 dark:shadow-none">
        <InvoiceInfo invoice={invoice} />
        <div className="px-6 pb-6 md:px-8 md:pb-8">
          <InvoiceItemsTable items={invoice.items} total={invoice.total} />
        </div>
      </div>

      {showDelete && (
        <DeleteModal
          invoiceId={invoice.id}
          onCancel={() => setShowDelete(false)}
          onConfirm={() => {
            deleteInvoice.mutate(invoice.id, {
              onSuccess: () => navigate("/"),
            });
          }}
        />
      )}

      {showEdit && (
        <InvoiceForm
          invoice={invoice}
          onClose={() => setShowEdit(false)}
          onSave={(updated) => {
            updateInvoice.mutate(updated, {
              onSuccess: () => setShowEdit(false),
            });
          }}
        />
      )}
    </div>
  );
}
