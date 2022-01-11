import Page from '@/components/page'
import Section from '@/components/section'

import { useState } from 'react'
import BlogPost from '@/components/BlogPost'
import { InferGetStaticPropsType } from 'next'
import { pick } from '@/lib/utils'
import { allBlogs } from '.contentlayer/data'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Tag from '@/components/Tag'
import path from 'path'
import kebabCase from '@/lib/kebabCase'
import Link from '@/components/Link'


export default function IndexNews({
																		posts,
																		tags
																	}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [searchValue, setSearchValue] = useState('')

	const filteredBlogPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchValue.toLowerCase())
	)

	const { t } = useTranslation('common')

	const sortedTags = Object.keys(tags).sort((a, b) =>
		tags[b] - tags[a]
	)

	return (
		<Page>
			<Section>
				<div className='flex flex-col items-start justify-center max-w-2xl mx-auto mb-16'>
					{/* #region === Page's introduction with search panel === */}
					<h1 className='mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white'>
						{t('blog.title')}
					</h1>
					<p className='mb-4 text-zinc-600 dark:text-zinc-400'>
						{t('blog.intro1')}{' '}<span className='font-bold'>{`${posts.length}`}</span>{' '}{t('blog.intro2')}
					</p>
					<div className='relative w-full mb-4'>
						<input
							aria-label='Search articles'
							type='text'
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder={t('blog.searchArticles')}
							className='block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100'
						/>
						<svg
							className='absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							/>
						</svg>
					</div>
					{/* #endregion */}
					<h3 className='mt-4 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white'>
						{t('blog.allTags')}
					</h3>

					{/* #region //*=== Display getBlogTags (solution based on 'tailwind-nextjs-starter-blog') === */}
					<div className="flex flex-wrap">
						{Object.keys(tags).length === 0 && 'No tags found.'}
						{sortedTags.map((ts) => {
							return (
								<div key={ts} className="mt-2 mb-2 mr-5">
									<Tag text={ts} />
									<Link
										href={`/tags/${kebabCase(t)}`}
										className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
									>
										{` (${tags[ts]})`}
									</Link >
								</div>
							)
						})}
					</div>
					{/* #endregion */}

					<h3 className='mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white'>
						{t('blog.allPosts')}
					</h3>
					{!filteredBlogPosts.length && (
						<p className='mb-4 text-gray-600 dark:text-gray-400'>
							No posts found.
							{t('blog.noFound')}
						</p>
					)}
					{filteredBlogPosts.map((post) => (
						<BlogPost key={post.title} {...post} />
					))}
				</div>
			</Section>
		</Page>
	)
}

//#region //* Get tags of each post === (solution based on 'tailwind-nextjs-starter-blog') ===
export function getBlogTags(data = allBlogs) {

	const values = data.flatMap((blog) => blog.tags)
	let tagCount = {}
	// Iterate through each post, putting all found tags into `tags`
	values.forEach((tag) => {
			const formattedTag = kebabCase(tag)
			if (formattedTag in tagCount) {
				tagCount[formattedTag] += 1
			} else {
				tagCount[formattedTag] = 1
			}
		}
	)
	return tagCount
}
//#endregion

export async function getStaticProps({ locale }) {
	const posts = allBlogs
		.map((post) =>
			pick(post, ['slug', 'title', 'summary', 'publishedAt', 'locale', 'tags'])
		)
		.filter((post) => post.locale === locale)
		.sort(
			(a, b) =>
				Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
		)
	// Accumulate tags
	const tags = getBlogTags();
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			posts,
			tags
		},
	}
}
