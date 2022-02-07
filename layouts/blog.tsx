import Image from 'next/image'
import { parseISO, format } from 'date-fns'
import Page from '@/components/page'
import Section from '@/components/section'
import ViewCounter from 'components/ViewCounter'
import type { PropsWithChildren } from 'react'
import type { Blog } from '.contentlayer/types'
import siteMetaData from '@/data/siteMetaData'
import { PageSeo } from '@/components/Seo'
import { useRouter } from 'next/router'


export default function BlogLayout({
																		 children,
																		 post
																	 }: PropsWithChildren<{ post: Blog }>) {
	const { locale } = useRouter()
	return (
		<Page>
			<PageSeo
				title={`${siteMetaData.siteName[locale]} - ${siteMetaData.blogPageName[locale]}`}
				description={siteMetaData.siteDescription[locale]}
				availableLocales={undefined}
			/>
			<Section>
				<article className='flex flex-col items-start justify-center max-w-prose mx-auto mb-16'>
					<div>
						<h1 className='mb-10'>
							{post.title}
						</h1>
						<div className='flex flex-col items-start justify-between w-full mb-10 md:flex-row md:items-center'>
							<div className='flex items-center'>
								<Image
									alt='Big Cap'
									height={24}
									width={24}
									src='/static/images/TwilioHero.png'
									className='rounded-full'
								/>
								<p className='ml-2 text-sm text-neutrals-700 dark:text-neutrals-100/60'>
									{'Big Cap / '}
									{format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
								</p>
							</div>
							<p className='mt-2 text-sm min-w-32 md:mt-0 text-neutrals-700 dark:text-neutrals-100/60'>
								{post.readingTime.text}
								{` • `}
								<ViewCounter slug={post.slug} />
							</p>
						</div>
						<div className='w-full max-w-none mt-4 prose dark:prose-dark prose-a:hover:text-[#BAE3FF]'>
							{children}
						</div>
					</div>
				</article>
			</Section>
		</Page>
	)
}
