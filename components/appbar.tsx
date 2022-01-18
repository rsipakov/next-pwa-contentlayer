import Link from '@/components/CustomLink'
import { useRouter } from 'next/router'
import LocaleSelect from '@/components/LocaleSelect'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import siteMetaData from '@/data/siteMetaData'

const links = [
	{ label: 'Home', href: '/' },
	{ label: 'Search', href: '/search' },
	{ label: 'Blog', href: '/blog' },
]

const Appbar = () => {
	const router = useRouter()
	const { locale } = useRouter()

	return (
		<div className='pt-safe w-full bg-zinc-900 fixed top-0 left-0 z-20'>
			<header className='px-safe bg-neutrals-100 border-b dark:bg-neutrals-900 dark:border-neutrals-700'>
				<div className='mx-auto px-6 max-w-screen-lg h-20 flex items-center justify-between'>
					<Link href='/'>
						<a>
							<h1 className='font-medium'>{siteMetaData.siteName[locale]}</h1>
						</a>
					</Link>
					<nav className='space-x-6 flex items-center'>
						<div className='hidden sm:block'>
							<div className='space-x-6 flex items-center'>
								{links.map(({ label, href }) => (
									<Link key={label} href={href}>
										<a
											className={`text-sm ${
												router.pathname === href
													? 'text-primary-700 dark:text-primary-100 font-medium'
													: 'text-neutrals-900 dark:text-neutrals-100 hover:text-neutrals-900/50 dark:hover:text-neutrals-100/50'
											}`}
										>
											{label}
										</a>
									</Link>
								))}
							</div>
						</div>
						<div>
							<LocaleSelect />
						</div>
						<div>
							<ThemeSwitcher />
						</div>
					</nav>
				</div>
			</header>
		</div>
	)
}

export default Appbar
