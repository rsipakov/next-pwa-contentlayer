import ListLayout from '@/layouts/ListLayout'
import kebabCase from '@/lib/kebabCase'
import fs from 'fs'
import { InferGetStaticPropsType } from 'next'
import path from 'path'
import { allBlogs } from '.contentlayer/data'

const root = process.cwd()

// TODO: refactor into contentlayer once compute over all docs is enabled
export async function getAllTags() {
	const tagCount: Record<string, number> = {}
	// Iterate through each post, putting all found tags into `tags`
	allBlogs.forEach((file) => {
		if (file.tags && file.draft !== true) {
			file.tags.forEach((tag) => {
				const formattedTag = kebabCase(tag)
				if (formattedTag in tagCount) {
					tagCount[formattedTag] += 1
				} else {
					tagCount[formattedTag] = 1
				}
			})
		}
	})

	return tagCount
}

export async function getStaticPaths() {
	const tags = await getAllTags()

	return {
		paths: Object.keys(tags).map((tag) => ({
			params: {
				tag,
			},
		})),
		fallback: false,
	}
}

export const getStaticProps = async (context) => {
	const tag = context.params.tag as string
	const filteredPosts = allBlogs.filter(
		(post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
	)

	return { props: { posts: filteredPosts, tag } }
}

export default function Tag({ posts, tag }: InferGetStaticPropsType<typeof getStaticProps>) {
	// Capitalize first letter and convert space to dash
	const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
	return (
		<>
			<ListLayout posts={posts} title={title} />
		</>
	)
}
