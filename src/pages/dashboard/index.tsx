import { Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav, Header, RecommendationBar, Sidebar } from 'src/components'
import { Bunnies } from '../bunnies'
import { Profile } from '../profile'
import { EventsPage, NotificationsPage, UserProfile, DirectMessages } from './views'

type Props = {}

function Events({ day }: { day: string | undefined }) {
  return (
    <div className="">
      <p className="primary-text">{day}</p>
    </div>
  )
}

function DashBoardRoutes() {
  return (
    <div className="lg:col-span-4">
      <Routes>
        <Route path="/" element={<Bunnies />} />
        <Route path="/bunny/:id" element={<Profile />} />
        <Route path="/calendar" element={<EventsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/directmessages" element={<DirectMessages />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export function DashBoard() {
  const path = useLocation().pathname

  const isDm = path.includes('directmessages')

  return (
    <>
      <Sidebar />
      {!isDm && <Header />}
      <div className=" grid-cols-7 pt-20 sm:ml-[96px] lg:ml-64 lg:grid lg:pt-0">
        <DashBoardRoutes />
        <RecommendationBar />
      </div>
      {!isDm && <BottomNav />}
    </>
  )
}
