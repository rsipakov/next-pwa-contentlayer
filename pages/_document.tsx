import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en' className="scroll-smooth">
				<Head>
					<meta charSet='utf-8' />
					<meta name='mobile-web-app-capable' content='yes' />
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta
						name='apple-mobile-web-app-status-bar-style'
						content='black-translucent'
					/>
					<meta
						name='theme-color'
						content='#f4f4f5'
						media='(prefers-color-scheme: light)'
					/>
					<meta
						name='theme-color'
						content='#18181b'
						media='(prefers-color-scheme: dark)'
					/>
					{/* #region Favicons */}
					{favicons.map((linkProps) => (
						<link key={linkProps.href} {...linkProps} />
					))}
					{/* #endregion */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
export default MyDocument

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
