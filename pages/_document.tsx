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
