import { Heart, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { likeBunny } from './features'

interface BunnyCardProps {
  username: string
  avatar: string
  _id: string
  _ref: string
}

function BunnyCard({ username, avatar, _id, _ref }: BunnyCardProps) {
  const navigation = useNavigate()
  const { username: user } = useChatContextParams()

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
        <p className="primary-text">{username}</p>
        <div className="flex gap-x-2">
          <button
            onClick={() => likeBunny(user, _id)}
            className="grid h-12 w-12 place-content-center rounded-full border-2 border-white "
          >
            <Heart size={28} fill="pink" color="red" />
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
      {/* <Button onClick={handleViewProfile} size={'lg'} className=" bg-fuchsia-500">
        View Profile
      </Button> */}
    </div>
  )
}

export function Bunnies() {
  const [bunnies, setBunnies] = useState([])

  const { username } = useChatContextParams()

  async function getBunnies() {
    const res = await fetch('http://192.168.100.16:3000/bunny/allbunnies')
    const bunnies = await res.json()
    setBunnies(bunnies.bunnies)
  }

  useEffect(() => {
    getBunnies()
  }, [])

  return (
    <>
      <div className="pb-10">
        {bunnies?.map((bunny: any) => {
          return (
            <BunnyCard key={bunny._id} _ref={bunny._ref} _id={bunny._id} username={bunny.name} avatar={bunny.avatar} />
          )
        })}
      </div>
    </>
  )
}
