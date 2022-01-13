import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'

export default function  Page ({ children }) {
	return (
		<>
			<Appbar />
			<main
				/**
				 * Padding top = `appbar` height
				 * Padding bottom = `bottom-nav` height
				 */
				className='mx-auto px-safe pt-20 pb-16 sm:pb-0 max-w-screen-md'
			>
				<div className='p-6'>{children}</div>
			</main>
			<BottomNav />
		</>
	)
}
