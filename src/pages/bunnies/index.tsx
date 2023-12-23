import { Heart, MessageSquare } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { likeBunny } from './features'
import { PostCard, PostCardProps } from 'src/components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'
import { Skeleton } from 'src/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'

interface BunnyCardProps {
  username: string
  avatar: string
  _id: string
  _ref: string
  following: string[]
}

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
      {items?.map((post: PostCardProps, index: number) => {
        return (
          <div key={index} className="">
            <PostCard {...post} />
          </div>
        )
      })}
    </div>
  )
}

const BunnyTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  // const [posts, setPosts] = useState([])

  const _id = localStorage.getItem('_id')

  async function getPosts() {
    const res = await fetch(`http://192.168.100.16:3000/posts?_id=${_id}`)
    const data = await res.json()
    const { posts, postsFromFollowing } = data
    return { posts, postsFromFollowing }
    // setFollowing(postsFromFollowing)
    // setPosts(posts)
  }

  const { isLoading, error, data: postsData } = useQuery({ queryKey: ['posts'], queryFn: getPosts })

  const { posts, postsFromFollowing } = postsData ?? {}

  // useEffect(() => {
  //   if (!username) {
  //     return
  //   }
  //   getPosts()
  // }, [username])

  return (
    <Tabs defaultValue="foryou" className=" w-full">
      <TabsList className="flex bg-transparent">
        <TabsTrigger className=" tab_trigger data-[state=active]:text-white " value="foryou">
          For You
        </TabsTrigger>
        <TabsTrigger className="tab_trigger data-[state=active]:text-white " value="following">
          Following
        </TabsTrigger>
      </TabsList>
      <TabsContent className="" value="foryou">
        <Feed loading={isLoading} items={posts} />
      </TabsContent>
      <TabsContent value="following">
        {postsFromFollowing?.length > 0 ? (
          <Feed loading={isLoading} items={postsFromFollowing} />
        ) : (
          <p className="primary-text">Not following yet</p>
        )}
      </TabsContent>
    </Tabs>
  )
}

function BunnyCard({ username, avatar, _id, following }: BunnyCardProps) {
  const navigation = useNavigate()
  const { username: user } = useChatContextParams()

  const isFollowing = following.includes(username)

  function handleViewProfile() {
    navigation(`/dashboard/bunny/${_id}`)
  }

  const BunnyAvatar = () => {
    return (
      <div className="">
        <img className="h-[300px]  w-full rounded-lg  object-cover" src={avatar} alt="" />
      </div>
    )
  }

  const BunnyInfo = () => {
    return (
      <div className="flex items-center justify-between">
        <p className="primary-text first-letter:uppercase">{username}</p>
        <div className="flex gap-x-2">
          <button
            onClick={() => likeBunny(user, _id)}
            className="grid h-12 w-12 place-content-center rounded-full border-2 border-white "
          >
            <Heart size={28} fill={isFollowing ? 'red' : 'white'} color="red" />
          </button>
          <button
            onClick={handleViewProfile}
            className="grid h-12 w-12 place-content-center rounded-full border-2 border-white "
          >
            <MessageSquare size={28} color="white" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md space-y-4 px-2 py-6">
      <BunnyAvatar />
      <BunnyInfo />
    </div>
  )
}

function BunnySorter(params: type) {
  return (
    <div className="px-2">
      <div className="border ">
        <p className="primary-text"> Sorter</p>
      </div>
    </div>
  )
}

export function Bunnies({ bunnies, posts, following }: any) {
  if (!bunnies) {
    return null
  }

  return (
    <>
      <div className="pb-14 ">
        <BunnyTabs posts={posts} following={following} />
      </div>
    </>
  )
}
