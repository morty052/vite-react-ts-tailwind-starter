import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav, RecommendationBar, Sidebar } from 'src/components'
import { Bunnies } from '../bunnies'
import { Profile } from '../profile'
import { EventsPage, NotificationsPage, UserProfile, DirectMessages, Wallet } from './views'

function DashBoardLayout() {
  const path = useLocation().pathname

  const isDm = path.includes('directmessages')

  return (
    <div className=" mx-auto max-w-7xl ">
      <div className={`flex`}>
        <Sidebar />
        <div className="dashboard-routes relative h-screen w-full overflow-y-scroll lg:w-[70%] xl:w-[47.5%] ">
          <Outlet />
        </div>
        <RecommendationBar />
      </div>
      <BottomNav />
    </div>
  )
}

function DashBoardRoutes() {
  return (
    // <div className="dashboard-routes relative h-screen w-full overflow-y-scroll lg:w-[70%] xl:w-[47.5%] ">
    // </div>
    <Routes>
      <Route element={<DashBoardLayout />}>
        <Route path="/" element={<Bunnies />} />
        <Route path="/bunny/:id" element={<Profile />} />
        <Route path="/calendar" element={<EventsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/wallet/*" element={<Wallet />} />
      </Route>
      <Route path="/directmessages" element={<DirectMessages />} />
    </Routes>
  )
}

export function DashBoard() {
  const path = useLocation().pathname

  const isDm = path.includes('directmessages')

  return (
    // <div className=" mx-auto max-w-7xl ">
    //   <div className={`flex`}>
    //     {!isDm && <Sidebar />}
    //     <DashBoardRoutes />
    //     {!isDm && <RecommendationBar />}
    //   </div>
    //   {!isDm && <BottomNav />}
    // </div>
    <Routes>
      <Route element={<DashBoardLayout />}>
        <Route path="/" element={<Bunnies />} />
        <Route path="/bunny/:id" element={<Profile />} />
        <Route path="/calendar" element={<EventsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/wallet/*" element={<Wallet />} />
      </Route>
      <Route path="/directmessages" element={<DirectMessages />} />
    </Routes>
  )
}
