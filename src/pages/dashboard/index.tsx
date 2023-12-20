import { Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav, RecommendationBar, Sidebar } from 'src/components'
import { Bunnies } from '../bunnies'
import { Profile } from '../profile'
import { EventsPage, NotificationsPage, UserProfile, DirectMessages, Wallet } from './views'

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
    <div className="relative md:col-span-4">
      <Routes>
        <Route path="/" element={<Bunnies />} />
        <Route path="/bunny/:id" element={<Profile />} />
        <Route path="/calendar" element={<EventsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/directmessages" element={<DirectMessages />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/wallet/*" element={<Wallet />} />
      </Routes>
    </div>
  )
}

export function DashBoard() {
  const path = useLocation().pathname

  const isDm = path.includes('directmessages')

  return (
    <>
      {!isDm && <Sidebar />}
      {/* {!isDm && <Header />} */}
      <div className={` ${!isDm ? 'grid-cols-7 sm:ml-[96px] md:grid  lg:ml-64' : ''} `}>
        <DashBoardRoutes />
        {!isDm && <RecommendationBar />}
      </div>
      {!isDm && <BottomNav />}
    </>
  )
}
