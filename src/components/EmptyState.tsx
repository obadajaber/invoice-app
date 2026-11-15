import illustration from '../assets/empty-illustration.svg'

export default function EmptyState() {
    return (
        <section className='mt-25.5 flex flex-col items-center text-center'>
            <img src={illustration} alt='illustration of a person' className='w-60.5' />
            <h2 className='mt-16 text-[24px] leading-5.5 font-bold tracking-[-0.75px] text-ink dark:text-white'>
                There is nothing here
            </h2>
            <p className='mt-3 max-w-55 text-muted'>
                Create an invoice by clicking the{' '}
                <span className='font-bold'>New Invoice</span>{' '}
                button and get started
            </p>
        </section>
    )
}