import { useRouter } from 'next/router'

export default function LocaleSelect() {

	const router = useRouter()
	const { locale, locales } = router
	const changeLanguage = (e: { target: { value: any; }; }) => {
		const locale = e.target.value
		router.push(router.asPath, router.asPath, { locale })
	}
	return (

		<select
			onChange={changeLanguage}
			defaultValue={locale}
			style={{ textAlignLast: 'center' }}
			className='text-sm text-zinc-900 dark:text-zinc-50 bg-zinc-200 dark:bg-zinc-400 rounded-lg border border-zinc-300 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500'
		>
			{locales.map((e) => (
				<option value={e} key={e}>
					{e}
				</option>
			))}
		</select>
	)
}
