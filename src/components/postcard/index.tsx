import { CircleDollarSign, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { createChat } from 'src/hooks/useChatClient'
import { BookmarkButton, ChatButton, LikeButton } from '../interactionbuttons'
import { TippingModal } from '../tippingmodal'

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
  postIsFromFollowing: boolean
  liked: boolean
}

export function PostCard(props: PostCardProps) {
  const [open, setOpen] = useState(false)

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
    liked,
    postIsFromFollowing,
  } = props ?? {}

  const navigation = useNavigate()
  const { username: user } = useChatContextParams()

  function handleViewProfile() {
    navigation(`/dashboard/bunny/${author_id}`)
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

  const FollowButton = () => {
    return (
      <>
        {!postIsFromFollowing && (
          <div className="">
            {!isFollowing ? (
              <button onClick={handleAddBunny} className="flex gap-x-2">
                <UserPlus size={28} color="white" />
              </button>
            ) : (
              <ChatButton bunny_id={author_id} />
            )}
          </div>
        )}
        {postIsFromFollowing && (
          <button onClick={handleAddBunny} className="flex gap-x-2">
            <ChatButton bunny_id={author_id} />
          </button>
        )}
      </>
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
        <FollowButton />
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
            <LikeButton liked={liked} post_id={post_id} likes={likes} />
          </div>
          <button onClick={handleTipModal} className="flex gap-x-2">
            <CircleDollarSign size={28} color="white" />
            <span className="text-light">Tip</span>
          </button>
        </div>
        <BookmarkButton isBookmarked={isBookmarked} post_id={post_id} />
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
