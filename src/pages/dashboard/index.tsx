import { Outlet, Route, Routes } from 'react-router-dom'
import { BottomNav, Header, RecommendationBar, Sidebar } from 'src/components'
import { Bunnies } from '../bunnies'
import { Profile } from '../profile'
import { EventsPage, NotificationsPage, UserProfile, DirectMessages, Wallet, ChatPage } from './views'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useChatContextParams } from 'src/contexts/ChatContext'

function DashBoardLayout({ bunnies, recommended }) {
  return (
    <div className=" mx-auto max-w-7xl ">
      <div className={`flex`}>
        <Sidebar />
        <div className="dashboard-routes relative h-screen w-full overflow-y-scroll lg:w-[70%] xl:w-[47.5%] ">
          <Header bunnies={bunnies} />
          <Outlet />
        </div>
        <RecommendationBar bunnies={bunnies} recommended={recommended} />
      </div>
      <BottomNav />
    </div>
  )
}

// async function getBunnies(username: string | null) {
//   const res = await fetch(`http://192.168.100.16:3000/bunny/allbunnies?username=${username}`)
//   const bunnies = await res.json()
//   // setBunnies(bunnies.bunnies)
//   return bunnies
// }

// async function getRecommended() {
//   const res = await fetch('http://192.168.100.16:3000/bunny/recommended')
//   const data = await res.json()
//   const { bunnies } = data
//   return bunnies
// }

// async function getPosts(username) {
//   const res = await fetch(`http://192.168.100.16:3000/posts?username=${username}`)
//   const data = await res.json()
//   const { posts, postsFromFollowing } = data
//   console.log(postsFromFollowing)
//   // setFollowing(postsFromFollowing)
//   // setPosts(posts)
//   return {
//     posts,
//     postsFromFollowing,
//   }
// }

// async function getEvents() {
//   console.log('username', username)
//   const res = await fetch(`http://192.168.100.16:3000/users/events?username=${username}`)
//   const data = await res.json()
//   const { events } = data
//   return events
// }

// async function getBunny() {
//   const res = await fetch(`http://192.168.100.16:3000/bunny/profile?id=${id}&username=${username}`)
//   const data = await res.json()
//   const { bunny, posts, isFollowing } = data
//   return { bunny, posts, isFollowing }
// }

// TODO: REDUCE DATA FETCHED FROM SERVER
export function DashBoard() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    events: [],
    bunnies: [],
    postsFromFollowing: [],
    posts: [],
    recommended: [],
  })

  const _id = localStorage.getItem('_id')

  const { username } = useChatContextParams()
  async function Init() {
    try {
      const res = await fetch(`http://192.168.100.16:3000/users/init?_id=${_id}`)
      const data = await res.json()
      // setData(data)
      setLoading(false)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const { isLoading, error, data: bunniesData } = useQuery({ queryKey: ['bunnies'], queryFn: Init })

  const { bunnies, postsFromFollowing, posts, recommended } = bunniesData ?? {}

  // useEffect(() => {
  //   if (!username) {
  //     return
  //   }
  //   Init()
  // }, [username])

  if (loading) {
    return null
  }

  return (
    <Routes>
      <Route element={<DashBoardLayout recommended={recommended} bunnies={bunnies} />}>
        <Route path="/" element={<Bunnies posts={posts} following={postsFromFollowing} bunnies={bunnies} />} />
        <Route path="/bunny/:id" element={<Profile bunnies={bunnies} username={username} />} />
        <Route path="/calendar" element={<EventsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/wallet/*" element={<Wallet />} />
      </Route>
      <Route path="/directmessages" element={<DirectMessages />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  )
}
