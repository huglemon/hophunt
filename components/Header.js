import { config } from '@/lib/config';
import Link from 'next/link';

export default function Header() {
	return (
		<nav className='absolute top-0 left-0 right-0 p-4 sm:p-8 z-10'>
			<div className='max-w-6xl mx-auto flex justify-between items-center'>
				<div className='text-xs sm:text-sm text-gray-600 truncate max-w-[60%] flex items-center gap-2'>
					<Link href='/' className='flex items-center gap-2 hover:text-gray-800 transition-colors'>
						<img
							src={config.product.logoUrl}
							alt={`${config.product.name} Logo`}
							className='w-5 h-5 sm:w-6 sm:h-6 object-contain'
							loading='lazy'
							style={{
								width: '24px',
								height: '24px',
							}}
						/>
						<span>{config.product.name}</span>
					</Link>
				</div>
				<div className='flex gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600'>
					<Link
						href={config.product.productHuntUrl}
						target='_blank'
						rel='noopener noreferrer'
					>
						去投票
					</Link>
					<Link
						href={config.product.productUrl}
						target='_blank'
						rel='noopener noreferrer'
					>
						看产品
					</Link>
				</div>
			</div>
		</nav>
	);
}
