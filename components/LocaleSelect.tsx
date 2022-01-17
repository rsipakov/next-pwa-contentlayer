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
			className='text-sm text-primary-900 dark:text-primary-50 bg-primary-200 dark:bg-primary-600 rounded-lg border border-primary-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500'
		>
			{locales.map((e) => (
				<option value={e} key={e}>
					{e}
				</option>
			))}
		</select>
	)
}
