import React, { useState, useEffect } from 'react';
import Page from '@/components/page'
import { PageSeo } from '@/components/Seo'
import Section from '@/components/section'
import siteMetadata from '@/data/siteMetaData'
import { useRouter } from 'next/router'
import CustomLinkSvg from '@/components/CustomLinkSvg'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const getTodos = () => {
	return fetch('https://jsonplaceholder.typicode.com/todos')
		.then(data => data.json())
};

// {JSON} Placeholder https://jsonplaceholder.typicode.com/
export default function TodoList({availableLocales}) {
	const { locale } = useRouter()
	const { t } = useTranslation('common')

	const [todos, setTodos] = useState([]);

	useEffect(() => {
		getTodos()
			.then(todos => setTodos(todos))
	}, []);

	return (
		<Page>
			<PageSeo
				title={`${siteMetadata.siteName[locale]} - ${siteMetadata.todosPageName[locale]}`}
				description={siteMetadata.siteDescription[locale]}
				availableLocales={availableLocales}
			/>
			<Section>
		<div className='flex flex-col items-start justify-center max-w-prose mx-auto mb-16'>
			<h1>{t('todos.title')}</h1>
			<div className='mt-6'>
				<p className='prose prose-md md:prose-lg dark:prose-dark'>
					&quot;{t('todos.description')}{' '}
					<CustomLinkSvg
					href='https://github.com/typicode/json-server'
					className='text-primary-700 hover:text-primary-100 dark:text-primary-100/70 dark:hover:text-primary-100'
					>
						JSON Server
					</CustomLinkSvg>{' '}+{' '}
					<CustomLinkSvg
						href='https://github.com/typicode/lowdb'
						className='text-primary-700 hover:text-primary-100 dark:text-primary-100/70 dark:hover:text-primary-100'
					>
						LowDB
					</CustomLinkSvg>
					&quot;
				</p>
				<div className='mt-6'>
					<CustomLinkSvg
						href='https://jsonplaceholder.typicode.com/'
						className='text-primary-700 hover:text-primary-100 dark:text-primary-100/70 dark:hover:text-primary-100'>
						Free fake API for testing and prototyping
					</CustomLinkSvg>
				</div>
			</div>
			<ul className="prose mt-8">
				{todos.map(todo => (
					<li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</li>
				))}
			</ul>
		</div>
			</Section>
		</Page>
	)
}

export async function getStaticProps({ locale, locales }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			// Will be passed to the page component as props
			availableLocales: locales
		}
	}
}
