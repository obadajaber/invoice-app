import logo from '../assets/logo.svg'
import moon from '../assets/icon-moon.svg'
import avatar from '../assets/avatar.png'

type Props = { theme: 'light' | 'dark'; onToggleTheme: () => void }

export default function Sidebar({ theme, onToggleTheme }: Props) {
    return (
        <aside className="fixed inset-y-0 left-0 z-30 flex w-25.75 flex-col rounded-r-[20px] bg-sidebar dark:bg-dark-1">

            {/* القسم العلوي : المربع البنفسجي الي ورا الشعار*/}
            <div className="flex h-25.75 items-center justify-center rounded-br-[20px] bg-primary">
                <img src={logo} alt="Invoice app logo" className="h-10 w-10" />
            </div>

            {/* القسم السفلي : القمر/الشمس و الصورة والفاصل */}
            <div className="mt-auto flex flex-col items-center">
                <button
                    type="button"
                    aria-label="Toggle theme"
                    onClick={onToggleTheme}
                    className="p-8"
                >
                    {theme === 'dark' ? (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="#7E88C3"
                            aria-hidden="true"
                            className="hover:fill-white"
                        >
                            <circle cx="10" cy="10" r="4" />
                            <path
                                d="M10 1v3M10 16v3M1 10h3M16 10h3M3.6 3.6l2.1 2.1M14.3 14.3l2.1 2.1M3.6 16.4l2.1-2.1M14.3 5.7l2.1-2.1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                className="text-muted-2"
                            />
                        </svg>
                    ) : (
                        <img src={moon} alt="" className="h-5 w-5" />
                    )}
                </button>

                <div className="flex w-full justify-center border-t border-[#494E6E] p-6">
                    <img src={avatar} alt="User avatar" className="h-10 w-10 rounded-full" />
                </div>
            </div>
        </aside>
    )
}