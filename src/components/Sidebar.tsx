import logo from "../assets/logo.svg";
import moon from "../assets/icon-moon.svg";
import avatar from "../assets/avatar.jpg";
import sun from "../assets/icon-sun.svg";

type Props = { theme: "light" | "dark"; onToggleTheme: () => void };

export default function Sidebar({ theme, onToggleTheme }: Props) {
  return (
    <aside className="fixed top-0 left-0 right-0 z-30 flex h-18 w-full flex-row bg-sidebar dark:bg-dark-1 md:h-20 lg:inset-y-0 lg:right-auto lg:h-auto lg:w-25.75 lg:flex-col lg:rounded-r-[20px]">
      {/* القسم العلوي : المربع البنفسجي الي ورا الشعار*/}
      <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-br-[20px] bg-primary md:h-20 md:w-20 lg:h-25.75 lg:w-full">
        <img src={logo} alt="Invoice app logo" className="h-8 w-8 lg:h-10 lg:w-10" />
      </div>

      {/* القسم السفلي : القمر/الشمس و الصورة والفاصل */}
      <div className="ml-auto flex flex-row items-center lg:ml-0 lg:mt-auto lg:flex-col">
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={onToggleTheme}
          className="p-4 lg:p-8"
        >
          {theme === "dark" ? (
            <img src={sun} alt="" className="h-5 w-5" />
          ) : (
            <img src={moon} alt="" className="h-5 w-5" />
          )}
        </button>

        <div className="flex justify-center border-l border-[#494E6E] p-4 lg:w-full lg:border-l-0 lg:border-t lg:p-6">
          <img
            src={avatar}
            alt="User avatar"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>
    </aside>
  );
}
