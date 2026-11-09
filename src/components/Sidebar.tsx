import logo from '../assets/logo.svg'
import moon from '../assets/icon-moon.svg'
import avatar from '../assets/avatar.png'

export default function Sidebar() {
    return (
        <aside className="flex h-screen w-[103px] flex-col rounded-r-[20px] bg-sidebar">

            {/* القسم العلوي : المربع البنفسجي الي ورا الشعار*/}
            <div className="flex h-[103px] items-center justify-center rounded-br-[20px] bg-primary">
                <img src={logo} alt="Invoice app logo" className="h-10 w-10"></img>
            </div>
            {/* القسم السفلي : القمر و الصورة والفاصل */}

            <div className='mt-auto flex flex-col items-center'>
                <button type='button' aria-label='togggle theme' className='p-8'>
                    <img src={moon} alt='moon logo' className='h-5 w-5' />
                </button>
                <div className='flex w-full justify-center border-t border-[#494E6E] p-6'>
                    <img src={avatar} alt='user avatar' className='h-10 w-10 rounded-full ' />

                </div>

            </div>
        </aside>
    )
}