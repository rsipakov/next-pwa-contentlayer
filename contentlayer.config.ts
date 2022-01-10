import {
	ComputedFields,
	defineDocumentType,
	makeSource,
} from 'contentlayer/source-files'

import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

const getLocale = (path) => {
	const pathArray = path.split('.')
	return pathArray.length > 2 ? pathArray.slice(-2)[0] : 'en'
}

const computedFields: ComputedFields = {
	readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
	wordCount: {
		type: 'number',
		resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
	},
	tweetIds: {
		type: 'json',
		resolve: (doc) => {
			const tweetMatches = doc.body.raw.match(/<StaticTweet\sid="[0-9]+"\s\/>/g)
			const tweetIDs = tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0])
			return tweetIDs ?? []
		},
	},
	slug: {
		type: 'string',
		resolve: (doc) => doc._raw.sourceFileName.replace(/(\.ru)?\.mdx$/, ''),
	},
	locale: {
		type: 'string',
		resolve: (doc) => {
			return getLocale(doc._raw.sourceFilePath)
		},
	},
}

const Blog = defineDocumentType(() => ({
	name: 'Blog',
	filePathPattern: 'blog/*.mdx',
	bodyType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		publishedAt: { type: 'string', required: true },
		summary: { type: 'string', required: true },
		image: { type: 'string', required: true },
		tags: { type: 'list', of: { type: 'string' }},
	},
	computedFields,
}))

const contentLayerConfig = makeSource({
	contentDirPath: 'data',
	documentTypes: [Blog],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			rehypeCodeTitles,
			rehypePrism,
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['anchor'],
					},
				},
			],
		],
	},
})

export default contentLayerConfig
