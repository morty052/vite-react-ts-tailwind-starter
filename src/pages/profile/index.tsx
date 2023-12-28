import { CircleDollarSign, RabbitIcon, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { ProfileTabs } from './components'
import { ChatButton, EventBooker } from 'src/components'
import { useToast } from 'src/components/ui/use-toast'
import { createChat } from 'src/hooks/useChatClient'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { bunny } from 'src/types/bunny'
import { Post } from 'src/types/post'
import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { day } from 'src/lib/day'

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

function ProfileInteractionButtons({
  bunny_id,
  bunny_name,
  chatImage,
  following,
}: {
  bunny_id: string
  bunny_name: string
  chatImage: string
  following: boolean
}) {
  const { toast } = useToast()
  const { username } = useChatContextParams()
  return (
    <div className=" flex items-center justify-end gap-x-4 px-2 pt-4">
      {!following ? (
        <button
          // onClick={() => toast({ title: 'Message sent!', description: 'Friday, February 10, 2023 at 5:57 PM' })}
          onClick={() => createChat(username, bunny_name, bunny_id, chatImage)}
          className="grid h-14 w-14 place-content-center rounded-full border-2 border-white "
        >
          <UserPlus color="white" />
        </button>
      ) : (
        <ChatButton bunny_id={bunny_id} />
      )}
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

function Bio({
  name,
  bio,
  username,
  online,
  last_seen,
}: {
  name: string | undefined
  bio: string
  username: string
  online: boolean
  last_seen: string
}) {
  const last_seen_online = '2023-12-27T22:27:32Z'
  const time_ago = last_seen ? day(last_seen).fromNow() : ''

  const OnlineIcon = () => {
    return (
      <div className="flex items-center gap-x-2">
        <p className="text-light">Online</p>
        <div className="h-2 w-2 rounded-full bg-green-400"></div>
      </div>
    )
  }

  const LastSeen = () => {
    return (
      <div className="flex items-center gap-x-2">
        <p className="text-light">{`Last seen ${time_ago}`}</p>
        <div className="h-2 w-2 rounded-full bg-slate-400"></div>
      </div>
    )
  }

  return (
    <>
      <div className="px-4 py-2">
        <div className="flex">
          <div className="flex flex-col  ">
            <span className="primary-text first-letter:uppercase">{name}</span>
            <div className="flex items-center gap-x-2">
              <span className="text-gray-400">@{username}</span>
              <div className="">{online ? <OnlineIcon /> : <LastSeen />} </div>
            </div>
          </div>
        </div>
        <div className="py-2">
          <p className="text-light">{bio}</p>
        </div>
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

function MainProfile({ bunny, posts, following }: { bunny: bunny; posts: Post[]; following: boolean }) {
  const { avatar, name, _id, bio, username, pricing, online, last_seen } = bunny
  return (
    <>
      <div className="col-span-4 w-full">
        <ProfileHeader avatar={avatar} />
        <ProfileInteractionButtons
          following={following}
          chatImage={avatar}
          bunny_name={name}
          bunny_id={_id as string}
        />
        <Bio online={online} last_seen={last_seen} username={username} bio={bio} name={name} />
        <div className="md:hidden">
          <EventBooker
            bunny_username={username}
            bunny_name={name}
            avatar={avatar}
            pricing={pricing}
            bunny_id={_id as string}
          />
        </div>
        <ProfileTabs posts={posts} bunny={bunny} />
      </div>
    </>
  )
}

// TODO: ADD PRICING DATA FOR BUNNIES
export function Profile({ username, bunnies }) {
  // const [bunny, setBunny] = useState<bunny | null>(null)
  const [posts, setPosts] = useState([])
  const [following, setFollowing] = useState(false)
  const { id } = useParams()

  const bunny = bunnies?.find((b) => b._id === id)
  const { name: bunnyName, isFollowing } = bunny ?? {}

  // TODO: CHANGE SERVER URL
  async function getBunnyPosts() {
    const res = await fetch(`http://192.168.100.16:3000/bunny/posts?bunny_id=${id}&username=${username}`)
    const data = await res.json()
    console.log(data)
    setPosts(data)
  }

  useEffect(() => {
    getBunnyPosts()
  }, [])

  if (!bunny) {
    return <p>Loading...</p>
  }

  return (
    <>
      <MainProfile following={isFollowing} posts={posts} bunny={bunny} />
    </>
  )
}
