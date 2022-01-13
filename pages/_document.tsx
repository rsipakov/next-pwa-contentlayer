import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<link
						href='/static/favicons/favicon-16x16.png'
						rel='icon'
						sizes='16x16'
						type='image/png'
					/>
					<link
						href='/static/favicons/favicon-32x32.png'
						rel='icon'
						sizes='32x32'
						type='image/png'
					/>
					<link
						rel='apple-touch-icon'
						href='/static/favicons/apple-touch-icon.png'
					/>
					<link
						color='#4a9885'
						href='/static/favicons/safari-pinned-tab.svg'
						rel='mask-icon'
					/>
					<link
						href='/static/favicons/favicon.ico'
						rel='shortcut icon'
					/>
					{/* #region Favicons */}
					{favicons.map((linkProps) => (
						<link key={linkProps.href} {...linkProps} />
					))}
					{/* #endregion Favicons */}
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
	color?: string;
};

const favicons: Array<Favicons> = [
	{
		href: '/static/favicons/favicon-32x32.png',
		rel: 'icon',
		sizes: '32x32',
		type: 'image/png'
	},
	{
		rel: 'apple-touch-icon',
		href: '/static/favicons/apple-touch-icon.png'
	},
	{
		color: '#4a9885',
		href: '/static/favicons/safari-pinned-tab.svg',
		rel: 'mask-icon'
	},
	{
		href: '/static/favicons/favicon.ico',
		rel: 'shortcut icon'
	}
]
