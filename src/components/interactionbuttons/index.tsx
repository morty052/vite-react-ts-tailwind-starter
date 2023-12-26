import { Bookmark, Heart, MessageCircle, UserPlus } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { createChat } from 'src/hooks/useChatClient'

type TaddContactProps = {
  user: string
  authorName: string
  author_id: string
  authorAvatar: string
}

type TchatButtonProps = {
  bunny_id: string
}

type TbookMarkProps = {
  setNewBookMark: React.Dispatch<React.SetStateAction<boolean>>
  isBookmarked: boolean
  newBookMark: boolean
  post_id: string
}

type TLikeButtonProps = {
  liked: boolean
  post_id: string
  likes: number
}

export function BookmarkButton(props: TbookMarkProps) {
  const { setNewBookMark, isBookmarked, newBookMark, post_id } = props

  async function handleRemoveBookMark() {
    setNewBookMark(false)
    const _id = localStorage.getItem('_id')
    await fetch(`http://192.168.100.16:3000/posts/remove-bookmark?_id=${_id}&post_id=${post_id}`)
    toast.success('Post removed from bookmarks.', {
      icon: <Bookmark />,
    })
  }

  async function handleBookmarkPost() {
    if (isBookmarked) {
      setNewBookMark(false)
      handleRemoveBookMark()
      return
    }
    if (newBookMark) {
      setNewBookMark(false)
      handleRemoveBookMark()
      return
    }
    setNewBookMark(true)
    const _id = localStorage.getItem('_id')
    await fetch(`http://192.168.100.16:3000/posts/bookmark-post?_id=${_id}&post_id=${post_id}`)
    toast.success('Post added to bookmarks.', {
      icon: <Bookmark />,
    })
  }

  const bookmarked = useMemo(() => {
    if (isBookmarked) {
      return true
    }

    if (newBookMark) {
      return true
    }

    return false
  }, [isBookmarked, newBookMark])

  return (
    <button onClick={handleBookmarkPost} className="">
      <Bookmark size={28} color={bookmarked ? 'rgb(217 70 239 ' : 'white'} />
    </button>
  )
}

export function AddContact(props: TaddContactProps) {
  const { user, authorName, author_id, authorAvatar } = props

  function handleAddBunny() {
    createChat(user, authorName, author_id, authorAvatar)
  }

  return (
    <div>
      <button onClick={handleAddBunny} className="flex gap-x-2">
        <UserPlus size={28} color="white" />
      </button>
    </div>
  )
}

export function ChatButton({ bunny_id }: TchatButtonProps) {
  const chatUrl = `/dashboard/directmessages?bunny_id=${bunny_id}`

  return (
    <div>
      <Link to={chatUrl} className="flex gap-x-2">
        <MessageCircle size={28} color="white" />
      </Link>
    </div>
  )
}

// TODO : ADD UNLIKED FUNCTION
// TODO CHANGE SERVER URL
export function LikeButton(props: TLikeButtonProps) {
  const { liked, likes, post_id } = props
  const [newLike, setNewLike] = useState<null | number>(null)
  const [unliked, setUnliked] = useState(false)

  async function unlikePost() {
    const _id = localStorage.getItem('_id')
    await fetch(`http://192.168.100.16:3000/posts/unlike?_id=${_id}&post_id=${post_id}`)
  }

  async function handleLikePost() {
    if (newLike) {
      console.log('was just liked')
      unlikePost()
      return
    }

    if (liked) {
      unlikePost()
      console.log('yyyy')
      return
    }

    if (unliked) {
      setUnliked(false)
    }

    const _id = localStorage.getItem('_id')
    setNewLike(likes + 1)
    await fetch(`http://192.168.100.16:3000/posts/like?_id=${_id}&post_id=${post_id}`)
  }

  async function handleUnlikePost() {
    setNewLike(likes - 1)
    setUnliked(true)
    unlikePost()
  }

  const isLiked = useMemo(() => {
    if (unliked) {
      return false
    }

    if (liked) {
      return true
    }

    if (newLike) {
      return true
    }

    return false
  }, [liked, newLike, unliked])

  return (
    <div onClick={isLiked ? handleUnlikePost : handleLikePost} className="flex cursor-pointer items-center gap-x-1">
      <Heart size={28} fill={isLiked ? 'red' : 'white'} color="red" />
      <p className="text-sm text-light">{!newLike ? likes : newLike}</p>
    </div>
  )
}
