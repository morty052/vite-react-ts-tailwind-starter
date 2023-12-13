import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { ProfileTabs } from './components'
import { InteractionModalButton } from 'src/components'
import { useToast } from 'src/components/ui/use-toast'
import { createChat } from 'src/hooks/useChatClient'
import { useChatContextParams } from 'src/contexts/ChatContext'

type bunny = {
  avatar: string
  name: string
  reel: string[]
  _id: string
}

function InteractionButtons({ bunny_id }: { bunny_id: string }) {
  const { toast } = useToast()
  const { username } = useChatContextParams()
  return (
    <div className=" flex items-center justify-end gap-x-4 px-2 pt-4">
      <button
        // onClick={() => toast({ title: 'Message sent!', description: 'Friday, February 10, 2023 at 5:57 PM' })}
        onClick={() => createChat(username, bunny_id)}
        className="grid h-14 w-14 place-content-center rounded-full border-2 border-white p-2"
      >
        <Heart color="white" />
      </button>
      <InteractionModalButton />
    </div>
  )
}

function ProfileHeader({ avatar }: { avatar: string | undefined }) {
  return (
    <div className="relative -mt-4 h-48 ">
      <img className=" h-48 w-full object-cover" src={avatar} alt="" />
      <div className="absolute -bottom-16 left-4 rounded-full border-2 border-white   ">
        <img className=" h-24 w-24 rounded-full object-cover " src={avatar} alt="" />
      </div>
    </div>
  )
}

function Bio({ name }: { name: string | undefined }) {
  return (
    <>
      <div className="p-2">
        <p className="primary-text">{name}</p>
        <p className="text-gray-400">@{name}</p>
        <span className="text-light">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde explicabo voluptatum veniam
        </span>
        InteractionButtons
      </div>
      <hr className="mt-4" />
    </>
  )
}

function SearchBarColumn() {
  return (
    <div className=" sticky top-0 hidden space-y-4 border-l bg-black p-2 lg:block">
      <p className="primary-text">Search</p>
      <Button className="bg-fuchsia-500" size={'lg'}>
        Search
      </Button>
    </div>
  )
}

function SubscriptionStatus() {
  return (
    <>
      <div className="space-y-4 p-2">
        <p className="primary-text">Subscription</p>
        <Button className="bg-fuchsia-500" size={'lg'}>
          Subscribe
        </Button>
      </div>
      <hr className="my-4" />
    </>
  )
}

function MainProfile({
  avatar,
  name,
  reel,
  bunny_id,
}: {
  avatar: string | undefined
  name: string | undefined
  reel: string[]
  bunny_id: string
}) {
  return (
    <div className="col-span-4 w-full">
      <ProfileHeader avatar={avatar} />
      <InteractionButtons bunny_id={name as string} />
      <Bio name={name} />
      <SubscriptionStatus />
      <ProfileTabs bunny_id={bunny_id} reel={reel} />
    </div>
  )
}

export function Profile() {
  const [bunny, setBunny] = useState<bunny | null>(null)
  const { id } = useParams()
  const { avatar, name } = bunny ?? {}

  async function getBunny() {
    const res = await fetch(`http://192.168.100.16:3000/bunny/profile?id=${id}`)
    const bunny = await res.json()
    setBunny(bunny)
  }

  useEffect(() => {
    getBunny()
  }, [])

  if (!bunny) {
    return <p>Loading...</p>
  }

  return (
    <>
      {/* <div className="min-h-screen grid-cols-6  lg:grid">
      </div> */}
      <MainProfile bunny_id={bunny?._id} reel={bunny?.reel} avatar={avatar} name={name} />
    </>
  )
}
