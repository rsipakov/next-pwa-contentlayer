import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import Meta from '@/data/meta'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<Meta />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default appWithTranslation(App);

// Reference for "next-themes": https://www.npmjs.com/package/next-themes
