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
import CustomLink from '@/components/CustomLink'
import siteMetaData from '@/data/siteMetaData'
import { PageSeo } from '@/components/Seo'
import { useRouter } from 'next/router'
import type { Blog } from '.contentlayer/types'

export default function IndexBlog({
																		posts,
																		tags,
																	}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [searchValue, setSearchValue] = useState('')

	const filteredBlogPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchValue.toLowerCase())
	)

	const { t } = useTranslation('common')

	const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])

	const { locale } = useRouter()
	return (
		<Page>
			<PageSeo
				title={`${siteMetaData.siteName[locale]} - ${siteMetaData.blogPageName[locale]}`}
				description={siteMetaData.siteDescription[locale]}
				availableLocales={undefined}
			/>
			<Section>
				<div className='flex flex-col items-start justify-center max-w-prose mx-auto mb-16'>
					{/* #region === Page's introduction with search panel === */}
					<h1>
						{t('blog.title')}
					</h1>
					<p className='my-6'>
						{t('blog.intro1')}{' '}<span className='font-bold'>{`${posts.length}`}</span>{' '}{t('blog.intro2')}
					</p>
					<div className='relative w-full mb-4'>
						<input
							aria-label='Search articles'
							type='text'
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder={t('blog.searchArticles')}
							className='text-neutrals-900 dark:text-neutrals-100 bg-neutrals-100/50 dark:bg-neutrals-700 border-neutrals-700/50 dark:border-neutrals-100/50 block w-full px-4 py-2 border rounded-md focus:ring-primary-700 focus:border-primary-700 dark:focus:ring-primary-700 dark:focus:border-primary-100'
						/>
						<svg
							className='absolute w-5 h-5 right-3 top-3 text-neutrals-900 dark:text-neutrals-100'
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
					<h3 className='mt-4 mb-4 tracking-tight'>
						{t('blog.allTags')}
					</h3>

					{/* #region //*=== Display getBlogTags (solution based on 'tailwind-nextjs-starter-blog') === */}
					<div className="flex flex-wrap">
						{Object.keys(tags).length === 0 && 'No tags found.'}
						{sortedTags.map((ts) => {
							return (
								<div key={ts} className="mt-2 mb-2 mr-5">
									<Tag text={ts} />
									<CustomLink
										href={`/tags/${kebabCase(t)}`}
										className="-ml-2 uppercase text-primary-700 hover:text-primary-100 dark:text-primary-100/70 dark:hover:text-primary-100"
									>
										{` (${tags[ts]})`}
									</CustomLink >
								</div>
							)
						})}
					</div>
					{/* #endregion */}

					<h2 className='mt-8 mb-4 tracking-tight'>
						{t('blog.allPosts')}
					</h2>
					{!filteredBlogPosts.length && (
						<p className='mb-4'>
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

// #region === Get All Tags ===
type PickedPost = Pick<
	Blog,
	'slug' | 'title' | 'summary' | 'publishedAt' | 'locale' | 'tags' | 'draft'
	>

// TODO: refactor into contentlayer once compute over all docs is enabled
export async function getAllTags(allBlogs: PickedPost[]) {
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
// #end region

export async function getStaticProps({ locale }) {
	const posts = allBlogs
		.map((post) =>
			pick(post, [
				'slug',
				'title',
				'summary',
				'publishedAt',
				'locale',
				'tags',
				'draft'
			])
		)
		.filter((post) => post.locale === locale)
		.sort(
			(a, b) =>
				Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
		)
	// Accumulate tags
	const tags = await getAllTags(posts)

	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			posts,
			tags
		},
	}
}
