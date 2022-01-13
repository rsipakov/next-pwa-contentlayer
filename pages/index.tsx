import Page from '@/components/page'
import Section from '@/components/section'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { PageSeo } from '@/components/Seo'
import siteMetadata from '@/data/siteMetaData'
import { useRouter } from 'next/router'

export default function IndexPage( { availableLocales }) {
	const { locale } = useRouter()
	const { t } = useTranslation('common');

	return (
	<Page>
		<Section>
			<h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
				{t('index.title')}
			</h2>
			<div className='mt-2'>
				<p className='text-zinc-600 dark:text-zinc-400'>
					You love rice, and so does the rest of the world. In the crop year
					2008/2009, the milled rice production volume amounted to over{' '}
					<span className='font-medium text-zinc-900 dark:text-zinc-50'>
						448 million tons
					</span>{' '}
					worldwide.
				</p>

				<br />

				<p className='text-sm text-zinc-600 dark:text-zinc-400'>
					<a
						href='https://github.com/mvllow/next-pwa-template'
						className='underline'
					>
						Source
					</a>
				</p>
			</div>
		</Section>
	</Page>
	)
}

export async function getStaticProps({ locale, locales }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			// Will be passed to the page component as props
			availableLocales: locales
		},
	};
}
