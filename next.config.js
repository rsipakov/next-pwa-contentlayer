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
		images: {
			domains: [
				'i.scdn.co', // Spotify Album Art
				'pbs.twimg.com' // Twitter Profile Picture
			]
		},
		i18n,
		webpack: (config, { dev, isServer }) => {
			config.module.rules.push({
				test: /\.(png|jpe?g|gif|mp4)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: '/_next',
							name: 'static/media/[name].[hash].[ext]',
						},
					},
				],
			})
			config.module.rules.push({
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			})
			if (!dev && !isServer) {
				// Replace React with Preact only in client production build
				Object.assign(config.resolve.alias, {
					'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
					react: 'preact/compat',
					'react-dom/test-utils': 'preact/test-utils',
					'react-dom': 'preact/compat',
				})
			}
			return config
		},
		pwa: {
			dest: 'public',
			runtimeCaching
		},
	})
])
