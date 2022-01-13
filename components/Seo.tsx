import Head from 'next/head'
import { useRouter } from 'next/router'
import siteMetaData from '@/data/siteMetaData'

const generateLinks = (router, availableLocales) =>
	availableLocales.map((locale) => (
		<link
			key={locale}
			rel={
				// Here we do as follow: Default langage is canonical
				// if default langage is not present, we get the first element of the langage array by default
				// Because the functions should be deterministic, it keep the same(s) link as canonical or alternante
				locale === router.defaultLocale
					? 'canonical'
					: !availableLocales.includes(router.defaultLocale) && locale === availableLocales[0]
						? 'canonical'
						: 'alternate'
			}
			hrefLang={locale}
			href={`${siteMetaData.siteUrl}${locale === router.defaultLocale ? '' : `/${locale}`}${
				router.asPath
			}`}
		/>
	))

const defaultMeta = {
	robots: 'follow, index',
	twitterCard: 'summary_large_imag',
	ogType: 'website'
};

export const PageSeo = ({ title, description, availableLocales }) => {

	const router = useRouter()

	return (
		<Head>
			<title>{`${title}`}</title>
			<meta name='robots' content={defaultMeta.robots} />
			<meta name='apple-mobile-web-app-title' content={siteMetaData.siteName[router.locale]} />
			<meta name='application-name' content={siteMetaData.siteName[router.locale]} />
			<meta name="description" content={description} />
			<meta property="og:url" content={`${siteMetaData.siteUrl}${router.asPath}`} />
			<meta property="og:type" content={defaultMeta.ogType} />
			<meta property="og:site_name" content={siteMetaData.siteName[router.locale]} />
			<meta property="og:description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:image" content={`${siteMetaData.siteUrl}${siteMetaData.socialBanner}`} />
			<meta property="og:locale" content={router.locale} />
			{availableLocales &&
				availableLocales
					.filter((locale) => locale !== router.locale)
					.map((locale) => <meta key={locale} property="og:locale:alternate" content={locale} />)}
			<meta name="twitter:card" content={defaultMeta.twitterCard} />
			<meta name="twitter:site" content={siteMetaData.twitterBanner} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={`${siteMetaData.siteUrl}${siteMetaData.socialBanner}`} />
			{availableLocales && generateLinks(router, availableLocales)}
			{/* #region Favicons */}
			{favicons.map((linkProps) => (
				<link key={linkProps.href} {...linkProps} />
			))}
			{/* #endregion */}
		</Head>
	)
}

type Favicons = {
	rel: string;
	href: string;
	sizes?: string;
	type?: string;
};

const favicons: Array<Favicons> = [
	{
		rel: 'apple-touch-icon',
		sizes: '57x57',
		href: '/static/favicons/apple-icon-57x57.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '60x60',
		href: '/static/favicons/apple-icon-60x60.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '72x72',
		href: '/static/favicons/apple-icon-72x72.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '76x76',
		href: '/static/favicons/apple-icon-76x76.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '114x114',
		href: '/static/favicons/apple-icon-114x114.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '120x120',
		href: '/static/favicons/apple-icon-120x120.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '144x144',
		href: '/static/favicons/apple-icon-144x144.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '152x152',
		href: '/static/favicons/apple-icon-152x152.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '180x180',
		href: '/static/favicons/apple-icon-180x180.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '192x192',
		href: '/static/favicons/android-icon-192x192.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '32x32',
		href: '/static/favicons/favicon-32x32.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '96x96',
		href: '/static/favicons/favicon-96x96.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '16x16',
		href: '/static/favicons/favicon-16x16.png',
	},
	{
		rel: 'manifest',
		href: '/static/favicons/manifest.json',
	},
];
