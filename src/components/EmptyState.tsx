import illustration from "../assets/empty-illustration.svg";

export default function EmptyState() {
  return (
    <section className='mt-25.5 flex flex-col items-center text-center md:mt-54 lg:mt-35'>
      <img
        src={illustration}
        alt="illustration of a person"
        className="w-48.25 md:w-60.5"
      />
      <h2 className="mt-10.5 text-[24px] leading-5.5 font-bold tracking-[-0.75px] text-ink md:mt-16 dark:text-white">
        There is nothing here
      </h2>
      <p className="mt-4 max-w-44 text-muted md:mt-6 md:max-w-48.25">
        Create an invoice by clicking the{" "}
        <span className="font-bold">
          <span className="md:hidden">New</span>
          <span className="hidden md:inline">New Invoice</span>
        </span>{" "}
        button and get started
      </p>
    </section>
  );
}
