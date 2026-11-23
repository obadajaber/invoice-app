type Props = {
  label?: string;
};

export default function Loader({ label = "Loading…" }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 py-24"
    >
      <span className="size-10 animate-morph bg-linear-to-br from-primary to-primary-light shadow-lg shadow-primary/30 motion-reduce:animate-none" />
      <p className="font-bold text-muted-2 dark:text-light-1">{label}</p>
    </div>
  );
}
