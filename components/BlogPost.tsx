import Link from '@/components/Link'
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
			<Link href={`/blog/${slug}`}>
				<a className='w-full'>
					<div className='w-full pb-2'>
						<div className='flex flex-col justify-between md:flex-row'>
							<h4
								className='w-full mb-2 text-lg font-medium text-zinc-900 md:text-xl dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-500'>
								{title}
							</h4>
							<p className='w-32 mb-4 text-left text-gray-500 md:text-right md:mb-0'>
								{`${views ? new Number(views).toLocaleString() : '–––'} views`}
							</p>
						</div>
						<p className='text-zinc-600 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-500'>
							{summary}
						</p>
					</div>
				</a>
			</Link>
			<div className='flex flex-wrap'>
				{tags.map((tag) => (
					<Tag key={tag} text={tag} />
				))}
			</div>
		</>
	)
}
