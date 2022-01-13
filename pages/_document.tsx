import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta charSet='utf-8'
					/>
					<meta
						name='mobile-web-app-capable'
						content='yes'
					/>
					<meta
						name='apple-mobile-web-app-capable'
						content='yes'
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
					<meta
						name="msapplication-TileColor"
						content="#e4e4e7"
					/>
					<meta
						content="/static/favicons/browserconfig.xml"
						name="msapplication-config"
					/>
					<link
						href="/static/favicons/favicon-16x16.png"
						rel="icon"
						sizes="16x16"
						type="image/png"
					/>
					<link
						href="/static/favicons/favicon-32x32.png"
						rel="icon"
						sizes="32x32"
						type="image/png"
					/>
					<link
						rel='apple-touch-icon'
						href='/static/favicons/apple-touch-icon.png'
					/>
					<link
						color="#4a9885"
						href="/static/favicons/safari-pinned-tab.svg"
						rel="mask-icon"
					/>
					<link
						href="/static/favicons/favicon.ico"
						rel="shortcut icon"
					/>
					<link
						href='/static/favicons/manifest.json'
						rel='manifest'
					/>
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
