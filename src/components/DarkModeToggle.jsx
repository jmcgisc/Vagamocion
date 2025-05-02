import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }, [])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    setDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-14 h-8 p-1 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none shadow-inner`}
    >
      <div
        className={`absolute w-6 h-6 bg-white dark:bg-black rounded-full shadow-md transform transition-transform duration-300 ${
          darkMode ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
      <Sun className="w-4 h-4 text-yellow-500 absolute left-1 top-2" />
      <Moon className="w-4 h-4 text-blue-400 absolute right-1 top-2" />
    </button>
  )
}
