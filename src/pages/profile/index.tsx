import { CircleDollarSign, RabbitIcon, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { ProfileTabs } from './components'
import { EventBooker, Header } from 'src/components'
import { useToast } from 'src/components/ui/use-toast'
import { createChat } from 'src/hooks/useChatClient'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { bunny } from 'src/types/bunny'
import { Post } from 'src/types/post'
import { Dialog, DialogContent } from 'src/components/ui/dialog'

function SubscriptionModal({ open, setOpen, eventName, handleCreateEvent, insufficientBalance }) {
  const EventConfirmation = () => {
    return (
      <div className="mt-4  px-2">
        <div className="flex justify-center space-y-4 rounded-lg bg-white p-6">
          <div className="space-y-4 text-center">
            <p className="">{eventName}</p>
            <div className="flex items-center gap-x-2">
              <span className="text-sm">Spend </span>
              <a className="flex gap-x-1">
                <span className=" font-semibold text-dark">40</span>
                <RabbitIcon color="pink" />
              </a>
              <span>To book a video chat</span>
            </div>
            <Button onClick={handleCreateEvent} size={'lg'}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const PurchaseCredits = () => {
    const event = eventName.toLowerCase()
    return (
      <div className="mt-4  px-2">
        <div className="flex justify-center space-y-4 rounded-lg bg-white p-6">
          <div className="space-y-4 text-center">
            <p className=" first-letter:uppercase">Purchase more credits to book {event}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>{!insufficientBalance ? <EventConfirmation /> : <PurchaseCredits />}</DialogContent>
    </Dialog>
  )
}

function InteractionButtons({ bunny_id, bunny_name }: { bunny_id: string; bunny_name: string }) {
  const { toast } = useToast()
  const { username } = useChatContextParams()
  return (
    <div className=" flex items-center justify-end gap-x-4 px-2 pt-4">
      <button
        // onClick={() => toast({ title: 'Message sent!', description: 'Friday, February 10, 2023 at 5:57 PM' })}
        onClick={() => createChat(username, bunny_name, bunny_id)}
        className="grid h-14 w-14 place-content-center rounded-full border-2 border-white "
      >
        <UserPlus color="white" />
      </button>
      <button className="grid h-14 w-14 place-content-center rounded-full border-2 border-white ">
        <CircleDollarSign color="white" />
      </button>
    </div>
  )
}

function ProfileHeader({ avatar }: { avatar: string | undefined }) {
  return (
    <div className="relative  h-48 ">
      <img className=" h-48 w-full object-cover" src={avatar} alt="" />
      <div className="absolute -bottom-16 left-4 rounded-full border-2 border-white   ">
        <img className=" h-24 w-24 rounded-full object-cover " src={avatar} alt="" />
      </div>
    </div>
  )
}

function Bio({ name, bio, username }: { name: string | undefined; bio: string; username: string }) {
  return (
    <>
      <div className="p-2">
        <p className="primary-text">{name}</p>
        <p className="text-gray-400">@{username}</p>
        <span className="text-light">{bio}</span>
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

function MainProfile({ bunny, posts }: { bunny: bunny; posts: Post[] }) {
  const { avatar, name, _id, bio, username } = bunny
  return (
    <>
      <Header bunnyName={name} isProfile />
      <div className="col-span-4 w-full">
        <ProfileHeader avatar={avatar} />
        <InteractionButtons bunny_name={name} bunny_id={_id as string} />
        <Bio username={username} bio={bio} name={name} />
        <div className="md:hidden">
          <EventBooker bunny_id={_id as string} />
        </div>
        <ProfileTabs posts={posts} bunny={bunny} />
      </div>
    </>
  )
}

export function Profile() {
  const [bunny, setBunny] = useState<bunny | null>(null)
  const [posts, setPosts] = useState([])
  const { id } = useParams()

  async function getBunny() {
    const res = await fetch(`http://192.168.100.16:3000/bunny/profile?id=${id}`)
    const data = await res.json()
    const { bunny, posts } = data
    console.log(posts)
    setBunny(bunny)
    setPosts(posts)
  }

  useEffect(() => {
    getBunny()
  }, [])

  if (!bunny) {
    return <p>Loading...</p>
  }

  return (
    <>
      <MainProfile posts={posts} bunny={bunny} />
    </>
  )
}
