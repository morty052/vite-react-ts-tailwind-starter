import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { PostCardProps, HomePostCard } from '../postcard'

export const Feed = ({ items, loading, postIsFromFollowing }: any) => {
  const FeedSkeleton = () => {
    return (
      <div className="space-y-6 divide-y">
        <div className="mx-2 space-y-2 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-14 w-14 rounded-full bg-dark" />
          </div>
          <Skeleton className="h-48 w-full bg-dark" />
        </div>
        <div className="mx-2 space-y-2 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-14 w-14 rounded-full bg-dark" />
          </div>
          <Skeleton className="h-48 w-full bg-dark" />
        </div>
        <div className="mx-2 space-y-2 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-14 w-14 rounded-full bg-dark" />
          </div>
          <Skeleton className="h-48 w-full bg-dark" />
        </div>
      </div>
    )
  }

  if (loading) {
    return <FeedSkeleton />
  }

  return (
    <div onScroll={() => console.log('enter')} className="h-screen pb-10">
      {items?.map((post: PostCardProps, index: number) => {
        return (
          <div key={index} className="">
            <HomePostCard {...post} />
          </div>
        )
      })}
    </div>
  )
}
