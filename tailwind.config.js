const { spacing, fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`
		}
		return `rgb(var(${variable}) / ${opacityValue})`
	}
}

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./layouts/**/*.tsx'
	],
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwindcss-safe-area'),
		require('@tailwindcss/forms'),
	],
	theme: {
		extend: {
			spacing: {
				'9/16': '56.25%',
			},
			fontFamily: {
				sans: ['IBM Plex Sans', ...fontFamily.sans]
			},
			colors: {
				primary: {
					50: withOpacityValue('--tw-color-blue-vivid-050'),
					100: withOpacityValue('--tw-color-blue-vivid-100'),
					700: withOpacityValue('--tw-color-blue-vivid-700'),
					900: withOpacityValue('--tw-color-blue-vivid-900'),
				},
				neutrals: {
					50: withOpacityValue('--tw-color-cool-grey-050'),
					100: withOpacityValue('--tw-color-cool-grey-100'),
					700: withOpacityValue('--tw-color-cool-grey-700'),
					900: withOpacityValue('--tw-color-cool-grey-900'),
				},
				supporting: {
					50: withOpacityValue('--tw-color-cyan-vivid-050'),
					100: withOpacityValue('--tw-color-cyan-vivid-100'),
					700: withOpacityValue('--tw-color-cyan-vivid-700'),
					900: withOpacityValue('--tw-color-cyan-vivid-900'),
				},
				info: colors.indigo
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.neutrals.900'),
						a: {
							color: theme("colors.primary.700"),
							"&:hover": {
								color: theme("colors.primary.100"),
							},
							code: { color: theme("colors.primary.400") },
						},
						'h1,h2,h3,h4': {
							color: theme('colors.neutrals.900'),
							letterSpacing: theme('letterSpacing.normal'),
							'scroll-margin-top': spacing[32]
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
						color: theme('colors.neutrals.100'),
						a: {
							color: theme("colors.primary.100"),
							"&:hover": {
								color: theme("colors.primary.100"),
							},
							code: { color: theme("colors.primary.400") },
						},
						blockquote: {
							borderLeftColor: theme('colors.gray.700'),
							color: theme('colors.gray.300')
						},
						'h1,h2,h3,h4': {
							color: theme('colors.neutrals.100'),
							letterSpacing: theme('letterSpacing.normal'),
							'scroll-margin-top': spacing[32]
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
}
