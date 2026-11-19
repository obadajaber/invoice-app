import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
    try {
        const saved = localStorage.getItem('theme')
        if (saved === 'dark' || saved === 'light') return saved
    } catch (error){
        console.warn('Could not read theme', error)
    }
    return 'light'
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        try {
            localStorage.setItem('theme', theme)
        } catch (error) {
           console.warn('Could not save theme', error)
        }
    }, [theme])

    function toggleTheme() {
        setTheme((t) => (t === 'light' ? 'dark' : 'light'))
    }

    return { theme, toggleTheme }
}