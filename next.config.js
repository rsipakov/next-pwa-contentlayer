const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const { i18n } = require('./next-i18next.config')
const { withContentlayer } = require('next-contentlayer')

const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

module.exports = withPlugins([
	[withBundleAnalyzer],
	[withContentlayer({})],
	withPWA({
		pwa: {
			dest: 'public',
			runtimeCaching
		}
	}),
	i18n,
])
