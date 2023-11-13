"use client";

import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

export default function MainHeader({ setSidebarOpen }: { setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-6 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-black/10 px-4 dark:shadow-sm sm:px-6 lg:px-4">
      <button onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-white xl:hidden">
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
      </button>

      <span className="xl:visible"></span>

      <button onClick={() => toggleTheme()} className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-blue-500" data-testid="dark-theme-toggle" type="button" aria-label="Toggle dark mode">
        <span className="hidden dark:block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        </span>

        <span className="dark:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </span>
      </button>
    </div>
  );
}