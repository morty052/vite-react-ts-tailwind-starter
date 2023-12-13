import { Calendar } from 'src/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { useEffect, useState } from 'react'
import { useChatContextParams } from 'src/contexts/ChatContext'

type Event = {
  date: string
  eventtype: string
  avatar: string
  name: string
}

function Event({ event }: { event: Event }) {
  const { date: rawDate, eventtype, avatar, name } = event

  const date = new Date(rawDate).getDay()

  return (
    <div className="rounded-lg bg-white">
      <img className="h-14 w-14 rounded-full object-cover" src={avatar} alt="" />
      <p className=" text-dark">{name}</p>
      <p className="">{eventtype}</p>
      <p className="">Booked {date}</p>
      <p className="">Status: Pending</p>
    </div>
  )
}

function UserCalender() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [viewingEvents, setViewingEvents] = useState(false)

  useEffect(() => {
    console.log()
  }, [date])

  return (
    <div className="h-screen pt-4">
      <div className="mx-auto flex w-fit flex-col gap-y-2  py-4">
        <p className="primary-text text-left ">Your events</p>
        <Calendar mode="single" selected={date} onSelect={setDate} className=" w-fit max-w-sm rounded-md  border" />
      </div>
      {/* <Event day={date?.toLocaleString('en-US', { day: 'numeric' })} /> */}
    </div>
  )
}

type Props = {
  day: string | undefined
}

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { username } = useChatContextParams()

  async function getEvents() {
    console.log('username', username)
    const res = await fetch(`http://192.168.100.16:3000/users/events?username=${username}`)
    const data = await res.json()
    const { events } = data
    console.log(events)
    setEvents(events)
    setLoading(false)
  }

  useEffect(() => {
    if (!username) {
      return
    }
    getEvents()
  }, [username])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Tabs defaultValue="events" className=" w-full">
      <TabsList className="flex bg-transparent">
        <TabsTrigger className=" tab_trigger data-[state=active]:text-white " value="events">
          Events
        </TabsTrigger>
        <TabsTrigger className="tab_trigger data-[state=active]:text-white " value="calendar">
          Calendar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="events">
        <div className="space-y-4 px-2">
          {events?.map((event, index) => (
            <Event key={index} event={event} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="calendar">
        <UserCalender />
      </TabsContent>
    </Tabs>
  )
}
