import ListLayout from '@/layouts/ListLayout'
import kebabCase from '@/lib/kebabCase'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'
import * as temp from '@/lib/temp'

export async function getStaticPaths() {
	const tags = await temp.getAllTags(allBlogs)

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
