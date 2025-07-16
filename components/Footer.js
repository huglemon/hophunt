import { Heart, Github, ExternalLink } from 'lucide-react';
import { config } from '@/lib/config';
import Link from 'next/link';

/* 
根据开源协议 请勿修改或删除版权信息
Copyright information - Please do not modify or remove
*/

export default function Footer() {
	return (
		<footer className='bg-white border-t border-gray-200 py-16'>
			<div className='max-w-6xl mx-auto px-8 text-center'>
				<div className='flex justify-center gap-8 text-sm text-gray-500 mb-4'>
					<Link
						href='https://github.com/huglemon/hophunt'
						target='_blank'
						rel='noopener noreferrer'
						className='hover:text-gray-700 transition-colors'
					>
						去制作中间页
					</Link>
					<Link
						href='https://github.com/huglemon/hophunt/issues'
						target='_blank'
						rel='noopener noreferrer'
						className='hover:text-gray-700 transition-colors'
					>
						反馈
					</Link>
				</div>
				<p className='text-xs text-gray-400'>
					© {new Date().getFullYear()} HopHunt with ❤️ by{' '}
					<Link
						href='https://dirshunt.com'
						target='_blank'
						className='hover:text-gray-700 transition-colors'
					>
						DirsHunt
					</Link>
					<span className='text-gray-400 px-2'>|</span>
					<Link
						href='https://www.huglemon.com'
						target='_blank'
						className='hover:text-gray-700 transition-colors'
					>
						Huglemon
					</Link>
				</p>
			</div>
		</footer>
	);
}
