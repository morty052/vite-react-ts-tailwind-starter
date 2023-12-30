import { useUser } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Feed } from 'src/components/feed'
import { Hero } from 'src/components/hero'

const NavigateToDashBoard = () => {
  const [loading, setLoading] = useState(true)
  const [id, setid] = useState(null)
  const { user } = useUser()
  const username = user?.username

  const getUserid = async () => {
    const res = await fetch(`http://192.168.100.16:3000/users/get-userid?username=${username}`)
    const data = await res.json()
    const { _id } = data
    setid(_id)
    localStorage.setItem('_id', _id)
    setLoading(false)
    // navigate(`/dashboard/?_id=${_id}`)
  }

  useEffect(() => {
    if (!username) {
      return
    }

    getUserid()
  }, [username])

  if (loading) {
    return null
  }

  return <Navigate to={`/dashboard`} />
}

export function Home() {
  const getHomePosts = async () => {
    const res = await fetch(`http://192.168.100.16:3000/posts/home_posts`)
    const data = await res.json()
    const { posts } = data
    return posts
  }

  const { isSignedIn } = useUser()
  const { data, isLoading } = useQuery({ queryKey: ['credits'], queryFn: getHomePosts })

  if (isSignedIn) {
    return <NavigateToDashBoard />
  }

  return (
    <div className="pb-10">
      <Hero />
      <hr className="mb-8" />
      <div className="mx-auto max-w-4xl  px-2">
        <p className="primary-text">Featured Posts</p>
        <Feed items={data} loading={isLoading} />
      </div>
    </div>
  )
}
