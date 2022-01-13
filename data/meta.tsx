import Head from 'next/head'

const Meta = () => (
	<Head>
		<meta charSet='utf-8' />
		<meta
			name='mobile-web-app-capable'
			content='yes' />
		<meta
			name='apple-mobile-web-app-capable'
			content='yes' />
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
		<meta
			name='viewport'
			content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
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
			href='/static/favicons/manifest.json'
			rel='manifest'
		/>
	</Head>
)

export default Meta
