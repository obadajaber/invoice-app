type Props = {
  message: string;
};

export default function ErrorBanner({ message }: Props) {
  return (
    <div
      role="alert"
      className="rounded-lg bg-danger/10 px-4 py-3 font-bold text-danger dark:text-danger-light"
    >
      {message}
    </div>
  );
}