import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'

export default function  Page ({ children }) {
	return (
		<>
			<Appbar />
			<main className='mx-auto px-safe pt-20 pb-16 sm:pb-0 max-w-screen-lg'>
				<div className='p-6'>{children}</div>
			</main>
			<BottomNav />
		</>
	)
}
