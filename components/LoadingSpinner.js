// 加载组件
export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin`}
      />
    </div>
  );
}

// 页面加载组件
export function PageLoader() {
  return (
    <div className='bg-white min-h-screen'>
      <div className='flex items-center justify-center pt-24 md:pt-48 pb-16'>
        <div className='max-w-2xl mx-auto px-4 sm:px-8 text-center'>
          <LoadingSpinner size="lg" className="mb-4" />
          <div className='text-gray-500'>正在加载...</div>
        </div>
      </div>
    </div>
  );
}

// 统计数据骨架屏
export function StatsLoader() {
  return (
    <div className='bg-gray-50 px-6 sm:px-8 py-6 sm:py-8 mx-4 sm:mx-0'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className='h-8 w-16 bg-gray-200 rounded mx-auto mb-1'></div>
            <div className='h-4 w-20 bg-gray-200 rounded mx-auto'></div>
          </div>
        ))}
      </div>
      <div className='mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 text-xs text-gray-500'>
        <div className="animate-pulse">
          <div className='h-3 w-32 bg-gray-200 rounded inline-block'></div>
        </div>
      </div>
    </div>
  );
} 