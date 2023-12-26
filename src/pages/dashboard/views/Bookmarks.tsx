import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { EmptyState, PostCard } from 'src/components'
import { Skeleton } from 'src/components/ui/skeleton'

const Feed = ({ items, loading }: any) => {
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
    <div className="pb-10">
      {items?.map((post: any, index: number) => {
        return (
          <div key={index} className="">
            <PostCard {...post} />
          </div>
        )
      })}
    </div>
  )
}

export function Bookmarks() {
  const [loading, setLoading] = useState(false)

  async function getBookmarks() {
    const _id = localStorage.getItem('_id')
    const res = await fetch(`http://192.168.100.16:3000/posts/bookmarks?_id=${_id}`)
    const data = await res.json()
    const { bookmarks } = data
    return bookmarks
    // setFollowing(postsFromFollowing)
    // setPosts(posts)
  }

  const { isLoading, error, data: postsData } = useQuery({ queryKey: ['bookmarks'], queryFn: getBookmarks })

  if (postsData?.length < 1) {
    console.log(postsData)
    return <EmptyState description="No bookmarks yet" />
  }

  return (
    <div>
      <Feed items={postsData} loading={isLoading} />
    </div>
  )
}
