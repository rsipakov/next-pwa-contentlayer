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
			className='text-sm text-neutrals-900 dark:text-neutrals-100 bg-neutrals-100 dark:bg-neutrals-900 rounded-lg border border-neutrals-700 focus:outline-none focus:ring-neutrals-700 focus:border-neutrals-700'
		>
			{locales.map((e) => (
				<option value={e} key={e}>
					{e}
				</option>
			))}
		</select>
	)
}
