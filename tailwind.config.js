const { spacing, fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

function withOpacity(variableName) {
	return ({ opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}), ${opacityValue})`;
		}
		return `rgb(var(${variableName}))`;
	};
}

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./layouts/**/*.tsx'
	],
	darkMode: 'class',
	theme: {
		extend: {
			spacing: {
				'9/16': '56.25%',
			},
			fontFamily: {
				sans: ['IBM Plex Sans', ...fontFamily.sans]
			},
			colors: {
				primary: colors.neutral,
				info: colors.indigo
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.primary.700'),
						a: {
							color: theme("colors.indigo.500"),
							"&:hover": {
								color: theme("colors.indigo.700"),
							},
							code: { color: theme("colors.primary.400") },
						},
						'h1,h2,h3,h4': {
							color: theme('colors.primary.600'),
							'scroll-margin-top': spacing[32]
						},
						'h1,h2,h3': {
							letterSpacing: theme('letterSpacing.tight'),
							fontWeight: '700',
						},
						'h4': {
							letterSpacing: theme('letterSpacing.tight'),
							fontWeight: '500',
						},
						thead: {
							borderBottomColor: theme('colors.gray.200')
						},
						code: { color: theme('colors.pink.500') },
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after': false
					}
				},
				dark: {
					css: {
						color: theme('colors.primary.200'),
						a: {
							color: theme("colors.indigo.400"),
							"&:hover": {
								color: theme("colors.indigo.200"),
							},
							code: { color: theme("colors.primary.400") },
						},
						blockquote: {
							borderLeftColor: theme('colors.gray.700'),
							color: theme('colors.gray.300')
						},
						'h1,h2,h3,h4': {
							color: theme('colors.primary.200'),
							'scroll-margin-top': spacing[32]
						},
						'h1,h2,h3': {
							letterSpacing: theme('letterSpacing.tight'),
							fontWeight: '700',
						},
						'h4': {
							letterSpacing: theme('letterSpacing.tight'),
							fontWeight: '500',
						},
						hr: { borderColor: theme('colors.gray.700') },
						ol: {
							li: {
								'&:before': { color: theme('colors.gray.500') }
							}
						},
						ul: {
							li: {
								'&:before': { backgroundColor: theme('colors.gray.500') }
							}
						},
						strong: { color: theme('colors.gray.100') },
						thead: {
							color: theme('colors.gray.100'),
							borderBottomColor: theme('colors.gray.600')
						},
						tbody: {
							tr: {
								borderBottomColor: theme('colors.gray.700')
							}
						}
					}
				}
			})
		}
	},
	variants: {
		typography: ['dark']
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwindcss-safe-area')
	],
}
