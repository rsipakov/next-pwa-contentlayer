// Replaces the spaces between words with a dash.
// Generate a slug just like GitHub does for markdown headings.

import { slug } from 'github-slugger'

const kebabCase = (str) => slug(str)

export default kebabCase
