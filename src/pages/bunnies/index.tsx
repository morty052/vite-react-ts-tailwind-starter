import { Heart, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { likeBunny } from './features'
import { Header, PostCard, PostCardProps } from 'src/components'

interface BunnyCardProps {
  username: string
  avatar: string
  _id: string
  _ref: string
  following: string[]
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

export function Bunnies() {
  const [bunnies, setBunnies] = useState([])
  const [following, setFollowing] = useState([])
  const [posts, setPosts] = useState([])

  const { username } = useChatContextParams()

  async function getBunnies() {
    const res = await fetch(`http://192.168.100.16:3000/bunny/allbunnies?username=${username}`)
    const bunnies = await res.json()
    setBunnies(bunnies.bunnies)
    setFollowing(bunnies.following)
  }
  async function getPosts() {
    const res = await fetch(`http://192.168.100.16:3000/posts`)
    const posts = await res.json()
    setPosts(posts)
  }

  useEffect(() => {
    if (!username) {
      return
    }
    getBunnies()
    getPosts()
  }, [username])

  return (
    <>
      <div className="pb-14 ">
        <Header bunnies={bunnies} base />
        {/* {bunnies?.map((bunny: any) => {
          return (
            <BunnyCard
              following={following}
              key={bunny._id}
              _ref={bunny._ref}
              _id={bunny._id}
              username={bunny.name}
              avatar={bunny.avatar}
            />
          )
        })} */}

        {posts?.map((post: PostCardProps) => {
          return <PostCard key={post._id} {...post} />
        })}
      </div>
    </>
  )
}
