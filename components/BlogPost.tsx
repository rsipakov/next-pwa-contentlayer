import CustomLink from '@/components/CustomLink'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { Views } from '@/lib/types'
import type { Blog } from '.contentlayer/types'
import Tag from '@/components/Tag'

export default function BlogPost({
																	 title,
																	 summary,
																	 slug,
																	 tags = []
																 }: Pick<Blog, 'title' | 'summary' | 'slug' | 'tags'>) {
	const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
	const views = data?.total

	return (
		<>
			<CustomLink href={`/blog/${slug}`}>
				<a className='w-full'>
					<div className='w-full pb-2'>
						<div className='flex flex-col justify-between md:flex-row'>
							<h4
								className='w-full mb-2 hover:text-neutrals-700/50 dark:hover:text-neutrals-700'>
								{title}
							</h4>
							<p className='w-32 mb-4 text-left md:text-right md:mb-0 hover:text-neutrals-700/50 dark:hover:text-neutrals-700'>
								{`${views ? new Number(views).toLocaleString() : '–––'} views`}
							</p>
						</div>
						<p className='hover:text-neutrals-700/50 dark:hover:text-neutrals-700'>
							{summary}
						</p>
					</div>
				</a>
			</CustomLink>
			<div className='flex flex-wrap'>
				{tags.map((tag) => (
					<Tag key={tag} text={tag} />
				))}
			</div>
		</>
	)
}
