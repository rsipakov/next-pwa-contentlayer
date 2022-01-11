const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const { i18n } = require('./next-i18next.config')
const { withContentlayer } = require('next-contentlayer')

const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

// reference: https://securityheaders.com/
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app;
  style-src 'self' 'unsafe-inline' *.googleapis.com cdn.jsdelivr.net;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' fonts.gstatic.com cdn.jsdelivr.net;
  frame-src giscus.app
`

const securityHeaders = [
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
	{
		key: 'Content-Security-Policy',
		value: ContentSecurityPolicy.replace(/\n/g, ''),
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	{
		key: 'Referrer-Policy',
		value: 'strict-origin-when-cross-origin',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	{
		key: 'X-Frame-Options',
		value: 'DENY',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=31536000; includeSubDomains; preload',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=()',
	},
]

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
		async headers() {
			return [
				{
					source: '/(.*)',
					headers: securityHeaders,
				},
			]
		},
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
