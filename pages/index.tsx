import Page from '@/components/page'
import Section from '@/components/section'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { PageSeo } from '@/components/Seo'
import siteMetadata from '@/data/siteMetaData'
import { useRouter } from 'next/router'

export default function IndexPage({ availableLocales }) {
	const { locale } = useRouter()
	const { t } = useTranslation('common')

	return (
		<Page>
			<PageSeo
				title={siteMetadata.siteName[locale]}
				description={siteMetadata.siteDescription[locale]}
				availableLocales={availableLocales}
			/>
			<Section>
				<div className='flex flex-col items-start justify-center max-w-prose mx-auto mb-16'>
				<h1>
					{t('index.title')}
				</h1>
				<div className='mt-6 prose prose-lg dark:prose-dark'>
					<p>
						Sem sed ullamcorper parturient magnis suspendisse sodales a quisque ad sodales faucibus vel mi dictum id eu
						parturient a. Aenean a himenaeos amet integer etiam rhoncus urna duis arcu venenatis condimentum risus
						facilisis ut parturient. Curabitur dui mi cras adipiscing netus mus morbi felis diam vestibulum augue
						viverra curae condimentum maecenas parturient lectus vehicula a ullamcorper risus nisi.
					</p>
					<p>Vestibulum a parturient facilisi quam parturient eget quis magna vulputate consectetur suscipit quam vestibulum vivamus dis aptent.</p>
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
