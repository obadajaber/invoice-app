import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useInvoices } from "../context/useInvoices";
import InvoiceActions from "../components/InvoiceActions";
import InvoiceInfo from "../components/InvoiceInfo";
import InvoiceItemsTable from "../components/InvoiceItemsTable";
import DeleteModal from "../components/DeleteModal";
import InvoiceForm from "../components/InvoiceForm";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, markPaid, updateInvoice } = useInvoices();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

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
    <div>
      <Link
        to="/"
        className="flex w-fit items-center gap-6 font-bold hover:text-muted-2 dark:text-white dark:hover:text-muted-2"
      >
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden="true">
          <path d="M6 1L2 5l4 4" stroke="#7C5DFA" strokeWidth="2" />
        </svg>
        Go back
      </Link>

      <InvoiceActions
        status={invoice.status}
        onEdit={() => setShowEdit(true)}
        onDelete={() => setShowDelete(true)}
        onMarkPaid={() => markPaid(invoice.id)}
      />

      <div className="mt-4 rounded-lg bg-white shadow-sm dark:bg-dark-1 dark:shadow-none">
        <InvoiceInfo invoice={invoice} />
        <div className="px-8 pb-8">
          <InvoiceItemsTable items={invoice.items} total={invoice.total} />
        </div>
      </div>

      {showDelete && (
        <DeleteModal
          invoiceId={invoice.id}
          onCancel={() => setShowDelete(false)}
          onConfirm={() => {
            deleteInvoice(invoice.id);
            navigate("/");
          }}
        />
      )}

      {showEdit && (
        <InvoiceForm
          invoice={invoice}
          onClose={() => setShowEdit(false)}
          onSave={(updated) => {
            updateInvoice(updated);
            setShowEdit(false);
          }}
        />
      )}
    </div>
  );
}