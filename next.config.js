const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const { i18n } = require('./next-i18next.config')
const { withContentlayer } = require('next-contentlayer')

module.exports = withPWA({
	pwa: {
		dest: 'public',
		runtimeCaching,
	},
	i18n,
	withContentlayer
})
