import clsx from 'clsx'
import React from 'react'
import { CircularText } from './CircularText'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div className="flex items-center">
      <div className="">
        <img
          alt="Rasmus Kala logo"
          width={193}
          height={100}
          loading={loading}
          fetchPriority={priority}
          decoding="async"
          className={clsx('max-w-[9.375rem] w-full h-[80px]', className)}
          src="/media/logo.png"
        />
      </div>
      <div className="-ml-[65px]">
        <CircularText text="ALEXEERMA • KALA • STUDIO •" onHover="goBonkers" size={50} />
      </div>
    </div>
  )
}
