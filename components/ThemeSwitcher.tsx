import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {

	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();
	// After mounting, we have access to the theme
	useEffect(() => setMounted(true), []);

	return (
			<button
				aria-label="Toggle Dark Mode"
				title="Theme toggle"
				type="button"
				className="w-7 h-7 bg-zinc-200 rounded-lg dark:bg-zinc-400 flex items-center justify-center hover:ring-2 ring-zinc-400 transition-all"
				onClick={() =>
					setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
				}
			>
				{mounted && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						className="w-4 h-4 text-zinc-900 dark:text-zinc-50"
					>
						{resolvedTheme === 'dark' ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
							/>
						)}
					</svg>
				)}
			</button>
	)
}
