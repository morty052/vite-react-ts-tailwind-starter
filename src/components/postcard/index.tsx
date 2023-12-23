import { Bookmark, CheckCircleIcon, CircleDollarSign, Heart, UserPlus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { createChat } from 'src/hooks/useChatClient'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '../ui/skeleton'
import toast from 'react-hot-toast'
import { ChatButton } from '../interactionbuttons'

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
  isBookmarked: boolean
  isFollowing: boolean
}

const getUserCredits = async () => {
  const _id = localStorage.getItem('_id')
  const balanceRequest = await fetch(`http://192.168.100.16:3000/users/credits?_id=${_id}`)
  const balanceData = await balanceRequest.json()
  const { credits } = balanceData
  return credits
}

function TippingVisuals({
  avatar,
  tip,
  credits,
  isLoading,
  insufficientBalance,
}: {
  avatar: string
  tip: number
  credits: number
  isLoading: boolean
  insufficientBalance: boolean
}) {
  const [balance, setBalance] = useState(tip)
  const CreditSkeleton = () => {
    return <Skeleton className="flex h-10 w-20   p-1" />
  }
  useMemo(() => setBalance(credits - tip), [tip, credits])
  const formattedCredit = balance?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="flex  items-center justify-center gap-x-2 ">
          <img className="h-14 w-14 rounded-full object-cover" src={avatar} alt="" />
          <div className="">
            <p>Bobby</p>
            <p className="text-xs">@bobbylee</p>
          </div>
        </div>
        <div className="flex ">
          {!insufficientBalance && <p className="text-2xl">{isLoading ? <CreditSkeleton /> : formattedCredit}</p>}
          {insufficientBalance && <p className="text-2xl">{'Insufficient credits'}</p>}
        </div>
      </div>
    </>
  )
}

function QuickTipTab({ amount, setPurchaseAmount }: { amount: number; setPurchaseAmount: any }) {
  return (
    <button
      onClick={() => setPurchaseAmount(amount)}
      className="flex h-10 w-20 items-center justify-center rounded-xl border bg-fuchsia-500 p-1"
    >
      <p className="text-sm font-semibold">{amount}</p>
    </button>
  )
}

function QuickTipsContainer({ setPurchaseAmount }: { setPurchaseAmount: any }) {
  const allTips = [50, 100, 500, 1000]
  return (
    <div className="">
      <p className="font-medium">Quick tip:</p>
      <div className="flex flex-wrap  gap-1">
        {allTips.map((tip, index) => (
          <QuickTipTab setPurchaseAmount={setPurchaseAmount} key={index} amount={tip} />
        ))}
      </div>
    </div>
  )
}

function CurrencyInput({ value, handleTipValue }: any) {
  return (
    <input
      value={value}
      onChange={(e) => handleTipValue(e.target.value)}
      placeholder="Enter custom amount"
      className="w-full rounded border p-2 text-center "
      type="text"
    />
  )
}

// function UserBalance({ tip }) {
//   return (
//     <div className="flex w-full justify-between self-start">
//       <p>Tip</p>
//       <p>{tip}</p>
//     </div>
//   )
// }

const TipConfirmation = (props: any) => {
  const { tip, setTip, avatar, confirmTip, insufficientBalance, setInsufficientBalance, loading } = props

  const { isLoading, data: credits, error } = useQuery({ queryKey: ['_id'], queryFn: getUserCredits })

  function handleTipValue(e: any) {
    if (insufficientBalance) {
      setInsufficientBalance(false)
    }

    if (isNaN(Number(e))) {
      return
    }

    if (credits - Number(e) < 0) {
      setInsufficientBalance(true)
    }

    setTip(e)
  }

  function TipConfirMationButton() {
    return (
      <div className=" space-y-2">
        <Button disabled={insufficientBalance} className="w-full max-w-md" onClick={confirmTip} size={'lg'}>
          {loading ? 'Confirming...' : 'Confirm tip'}
        </Button>
        <p className="text-center text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
    )
  }

  return (
    <div className="px-2 sm:px-0">
      <div className="flex flex-col items-center space-y-4 rounded-lg  bg-white p-4">
        <div className="w-full max-w-md  space-y-6 ">
          {/* <UserBalance tip={tip} /> */}
          <TippingVisuals
            insufficientBalance={insufficientBalance}
            isLoading={isLoading}
            tip={tip}
            credits={credits}
            avatar={avatar}
          />
          <div className="mx-auto w-full space-y-4">
            <QuickTipsContainer setPurchaseAmount={setTip} />
            <CurrencyInput value={tip} handleTipValue={handleTipValue} />
            <TipConfirMationButton />
          </div>
        </div>
      </div>
    </div>
  )
}

const TipConfirmedModal = (props: any) => {
  return (
    <div className="px-2 sm:px-0">
      <div className="flex flex-col items-center space-y-4 rounded-lg  bg-white p-4">
        <CheckCircleIcon size={100} color="green" />
        <p className="text-2xl font-semibold">Tip sent!</p>
      </div>
    </div>
  )
}

function TippingModal({ open, setOpen, eventName, avatar }: any) {
  const [tip, setTip] = useState('')
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const checkBalance = async (purchaseAmount: number) => {
    const _id = localStorage.getItem('_id')
    const balanceRequest = await fetch(`http://192.168.100.16:3000/users/credits?_id=${_id}`)
    const balanceData = await balanceRequest.json()
    const { credits } = balanceData
    if (credits >= purchaseAmount) {
      console.log('user has enough credits')
      return true
    } else {
      console.log('user has insufficient credits')
      return false
    }
  }

  async function confirmTip() {
    if (insufficientBalance) {
      return
    }
    setLoading(true)
    const canAfford = await checkBalance(Number(tip))
    if (!canAfford) {
      setLoading(false)
      return
    }
    setLoading(false)
    setSuccess(true)
  }

  const handleClose = () => {
    setOpen(false)
    setInsufficientBalance(false)
    setTip('')
    setLoading(false)
    setSuccess(false)
  }

  const PurchaseCredits = () => {
    return (
      <div className="mt-4  px-2">
        <div className="flex justify-center space-y-4 rounded-lg bg-white p-6">
          <div className="space-y-4 text-center">
            <p className=" first-letter:uppercase">Purchase more credits to book Tip</p>
          </div>
        </div>
      </div>
    )
  }

  const tipModalContentProps = {
    eventName,
    tip,
    setTip,
    avatar,
    insufficientBalance,
    setInsufficientBalance,
    confirmTip,
    loading,
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        {!success ? <TipConfirmation {...tipModalContentProps} /> : <TipConfirmedModal {...tipModalContentProps} />}
      </DialogContent>
    </Dialog>
  )
}

export function PostCard(props: PostCardProps) {
  const [liked, setLiked] = useState<null | number>(null)
  const [newBookMark, setNewBookMark] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    image,
    _id: post_id,
    likedBy,
    authorName,
    authorAvatar,
    text,
    authorUsername,
    time,
    likes,
    author_id,
    isBookmarked,
    isFollowing,
  } = props ?? {}

  // !name of id variable changed here
  const base_id = searchParams.get('_id')

  const baseUrl = `?_id=${base_id}`

  const navigation = useNavigate()
  const { username: user } = useChatContextParams()

  const isLiked = likedBy?.includes(user)

  function handleViewProfile() {
    navigation(`/dashboard/bunny/${author_id}`)
  }

  async function handleLikePost() {
    setLiked(likes + 1)
    const res = await fetch(`http://192.168.100.16:3000/posts/like?username=${user}&post_id=${_id}`)
    const data = await res.json()
  }

  async function handleBookmarkPost() {
    setNewBookMark(true)
    const _id = localStorage.getItem('_id')
    const res = await fetch(`http://192.168.100.16:3000/posts/bookmark-post?_id=${_id}&post_id=${post_id}`)
    const data = await res.json()
    toast.success('Post added to bookmarks.', {
      icon: <Bookmark />,
    })
  }

  function handleAddBunny() {
    createChat(user, authorName, author_id, authorAvatar)
  }

  const PostImage = () => {
    return (
      <div className="">
        <img className=" h-[359px] w-full  object-cover  " src={image} alt="" />
      </div>
    )
  }

  const PostInfo = () => {
    return (
      <div className="flex items-center justify-between px-2">
        <div className="flex items-start gap-x-2">
          <button onClick={handleViewProfile} className="grid  place-content-center  ">
            <img className="h-12 w-12 rounded-full border-2 border-white object-cover" src={authorAvatar} alt="" />
          </button>
          <div className="">
            <p className="text-lg text-light first-letter:uppercase">{authorName}</p>
            <p className="text-sm text-light">@{authorUsername}</p>
          </div>
        </div>
        {!isFollowing ? (
          <button onClick={handleAddBunny} className="flex gap-x-2">
            <UserPlus size={28} color="white" />
          </button>
        ) : (
          <ChatButton bunny_id={author_id} />
        )}
      </div>
    )
  }

  const handleTipModal = () => {
    setOpen(true)
  }

  const PostButtons = () => {
    return (
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-x-6 ">
          <div className="flex gap-x-4">
            <div onClick={handleLikePost} className="flex cursor-pointer items-center gap-x-1">
              <Heart size={28} fill={isLiked || liked ? 'red' : 'white'} color="red" />
              <p className="text-sm text-light">{!liked ? likes : liked}</p>
            </div>
          </div>
          <button onClick={handleTipModal} className="flex gap-x-2">
            <CircleDollarSign size={28} color="white" />
            <span className="text-light">Tip</span>
          </button>
        </div>
        <button onClick={handleBookmarkPost} className="">
          <Bookmark size={28} color={isBookmarked || newBookMark ? 'rgb(217 70 239 ' : 'white'} />
        </button>
      </div>
    )
  }

  const PostText = () => {
    return (
      <div className=" w-[90%] px-2">
        <p className="font-li text-lg text-light">{text}</p>
      </div>
    )
  }

  return (
    <div className="border-b  border-white/10 ">
      <div className="mx-auto   space-y-4  py-6">
        <PostInfo />
        <PostText />
        <PostImage />
        <PostButtons />
      </div>
      <TippingModal avatar={authorAvatar} open={open} setOpen={setOpen} />
    </div>
  )
}
