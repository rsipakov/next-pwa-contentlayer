import { useMDXComponent } from 'next-contentlayer/hooks';
import { getTweets } from 'lib/twitter';
import components from 'components/MDXComponents';
import BlogLayout from 'layouts/blog';
import Tweet from 'components/Tweet';
import { allBlogs } from '.contentlayer/data';
import type { Blog } from '.contentlayer/types';

export default function Post({ post, tweets }: { post: Blog; tweets: any[] }) {
  const Component = useMDXComponent(post.body.code);
  const StaticTweet = ({ id }) => {
    const tweet = tweets.find((tweet) => tweet.id === id);
    return <Tweet {...tweet} />;
  };

	return (
		<BlogLayout post={post}>
			<Component
				components={
					{
						...components,
						StaticTweet
					} as any
				}
			/>
		</BlogLayout>
	);
}

export async function getStaticPaths() {
	return {
		paths: allBlogs.map((p) => ({
			params: { slug: p.slug },
			locale: p.locale,
		})),
		fallback: false,
	}
}

export async function getStaticProps({ params, locale }) {
	const post = allBlogs.find(
		(post) => post.slug === params.slug && post.locale === locale
	)
	const tweets = await getTweets(post.tweetIds)

	return { props: { post, tweets } }
}
