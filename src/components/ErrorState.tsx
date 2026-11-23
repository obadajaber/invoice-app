type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
};

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't reach the server. Check your connection and try again.",
  onRetry,
  isRetrying = false,
}: Props) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-sm flex-col items-center py-16 text-center"
    >
      <div className="flex size-20 items-center justify-center rounded-full bg-danger/10">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#EC5757"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      <h2 className="mt-6 text-2xl font-bold text-ink dark:text-white">
        {title}
      </h2>
      <p className="mt-3 text-muted-2 dark:text-light-1">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-8 h-12 cursor-pointer rounded-full bg-primary px-8 font-bold text-white transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRetrying ? "Retrying…" : "Try again"}
        </button>
      )}
    </div>
  );
}
