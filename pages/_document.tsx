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
					<meta name='apple-mobile-web-app-title' content='Rice Bowl' />
					<meta name='application-name' content='Rice Bowl' />
					<meta name='description' content='Bring your own ingredients' />
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
					<link rel='apple-touch-icon' href='/images/favicon/icon-maskable-512.png' />
					<link rel='icon' type='image/png' href='/images/favicon/favicon.png' />
					<link rel='manifest' href='/manifest.json' />
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
