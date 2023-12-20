import { ArrowRight, ChevronDown, ChevronUp, CircleDollarSign, Heart, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { createChat } from 'src/hooks/useChatClient'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'

export type PostCardProps = {
  image: string
  _id: string
  likedBy?: string[]
  likes: number
  authorName: string
  text: string
  authorAvatar: string
  authorUsername: string
  time: string
  author_id: string
}

function TippingVisuals({ avatar, tip, setTip }: { avatar: string; tip: number; setTip: any }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex ">
          <div className="flex flex-col">
            <ChevronUp onClick={() => setTip(tip + 100)} />
            <ChevronDown onClick={() => setTip(tip - 100)} />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-x-2 ">
          <p className="text-2xl">{tip}</p>
          <ArrowRight size={28} />
        </div>
        <img className="h-14 w-14 rounded-full object-cover" src={avatar} alt="" />
      </div>
    </>
  )
}

function UserBalance({ tip }) {
  return (
    <div className="flex w-full justify-between self-start">
      <p>Tip</p>
      <p>{tip}</p>
    </div>
  )
}

function TippingModal({ open, setOpen, eventName, avatar }) {
  const [tip, setTip] = useState(100)
  const [insufficientBalance, setInsufficientBalance] = useState(false)

  const { username } = useChatContextParams()

  const checkBalance = async (purchaseAmount: number) => {
    const balanceRequest = await fetch(`http://192.168.100.16:3000/users/credits?username=${username}`)
    const balanceData = await balanceRequest.json()
    const { credits } = balanceData
    console.log('user balance is ', credits)
    if (credits >= purchaseAmount) {
      console.log('user has enough credits')
      return true
    } else {
      console.log('user has insufficient credits')
      return false
    }
  }

  async function confirmTip() {
    await checkBalance(tip)
    setOpen(false)
  }
  const EventConfirmation = () => {
    return (
      <div className="px-2 sm:px-0">
        <div className="flex flex-col items-center space-y-4 rounded-lg  bg-white p-4">
          <div className="w-full space-y-4  ">
            <UserBalance tip={tip} />
            <TippingVisuals tip={tip} setTip={setTip} avatar={avatar} />
            <Button className="mx-auto w-full max-w-md" onClick={confirmTip} size={'lg'}>
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

export function PostCard(props: PostCardProps) {
  const [liked, setLiked] = useState<null | number>(null)
  const [open, setOpen] = useState(false)
  const { image, _id, likedBy, authorName, authorAvatar, text, authorUsername, time, likes, author_id } = props ?? {}

  const timestamp = new Date(time).toLocaleString('default', { month: 'short' }) + ' ' + new Date(time).getDay()

  const navigation = useNavigate()
  const { username: user } = useChatContextParams()

  const isFollowing = likedBy?.includes(authorName)

  function handleViewProfile() {
    navigation(`/dashboard/bunny/${author_id}`)
  }

  async function handleLikePost() {
    const res = await fetch(`http://192.168.100.16:3000/posts/like?username=${user}&post_id=${_id}`)
    const data = await res.json()
    setLiked(likes + 1)
  }

  function handleAddBunny() {
    createChat(user, authorName, author_id, authorAvatar)
  }

  const PostImage = () => {
    return (
      <div className="">
        <img className="h-[300px]  w-full rounded-lg  object-cover" src={image} alt="" />
      </div>
    )
  }

  const PostInfo = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-x-2">
          <button onClick={handleViewProfile} className="grid  place-content-center  ">
            <img className="h-12 w-12 rounded-full border-2 border-white object-cover" src={authorAvatar} alt="" />
          </button>
          <div className="">
            <p className="text-lg text-light first-letter:uppercase">{authorName}</p>
            <p className="text-sm text-light">@{authorUsername}</p>
          </div>
        </div>
        <button onClick={handleAddBunny} className="flex gap-x-2">
          <UserPlus size={28} color="white" />
        </button>
      </div>
    )
  }

  const handleTipModal = () => {
    setOpen(true)
  }

  const PostButtons = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4">
          <div onClick={handleLikePost} className="flex items-center gap-x-1">
            <Heart size={28} fill={isFollowing ? 'red' : 'white'} color="red" />
            <p className="text-sm text-light">{!liked ? likes : liked}</p>
          </div>
        </div>
        <button onClick={handleTipModal} className="flex gap-x-2">
          <CircleDollarSign size={28} color="white" />
          <span className="text-light">Tip</span>
        </button>
      </div>
    )
  }

  const PostText = () => {
    return (
      <div className=" w-[90%]">
        <p className="font-li text-lg text-light">{text}</p>
      </div>
    )
  }

  return (
    <div className="border-y ">
      <div className="mx-auto max-w-lg  space-y-4 px-2 py-6">
        <PostInfo />
        <PostText />
        <PostImage />
        <PostButtons />
      </div>
      <TippingModal avatar={authorAvatar} open={open} setOpen={setOpen} />
    </div>
  )
}
