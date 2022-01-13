import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<Head>
				<meta content="width=device-width, initial-scale=1" name="viewport" />
			</Head>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default appWithTranslation(App);

// Reference for "next-themes": https://www.npmjs.com/package/next-themes
