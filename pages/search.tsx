import Page from '@/components/page'
import Section from '@/components/section'
import siteMetadata from '@/data/siteMetaData'
import { PageSeo } from '@/components/Seo'
import { useRouter } from 'next/router'
import CustomLinkSvg from '@/components/CustomLinkSvg'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function StoryPage({ availableLocales }) {
	const { locale } = useRouter()
	const { t } = useTranslation('common')
	return (
		<Page>
			<PageSeo
				title={`${siteMetadata.siteName[locale]} - ${siteMetadata.storyPageName[locale]}`}
				description={siteMetadata.siteDescription[locale]}
				availableLocales={availableLocales}
			/>
			<Section>
				<div className='flex flex-col items-start justify-center max-w-prose mx-auto mb-16'>
				<h1>{t('search.title')}</h1>
				<div className='mt-6'>
					<p className='prose prose-lg dark:prose-dark'>
						&quot;Ante a auctor consectetur consectetur a adipiscing cum est parturient scelerisque egestas auctor a
						diam ornare vestibulum mi viverra cursus pulvinar congue suspendisse parturient netus tristique a hac.&quot;
					</p>
					<div className='mt-6'>
						<CustomLinkSvg
							href='https://google.com'
							className='text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200'>
							Go to Google
						</CustomLinkSvg>
					</div>
				</div>
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
		}
	}
}
