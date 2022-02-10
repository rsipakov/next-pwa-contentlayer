import Page from '@/components/page'
import Section from '@/components/section'
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

export default function IndexTags({
																		tags,
																	}: InferGetStaticPropsType<typeof getStaticProps>) {

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
// TODO: refactor into contentlayer once compute over all docs is enabled, Follow to https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/contentlayer/pages/tags.tsx
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

export async function getStaticProps({ locale, params }) {
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
