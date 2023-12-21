import { Calendar } from 'src/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { useEffect, useState } from 'react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { Header } from 'src/components'
import { Camera, Table, Video } from 'lucide-react'
import { Button } from 'src/components/ui/button'

type EventNames = 'DATE' | 'PHOTO' | 'VIDEO'
type Event = {
  date: string
  eventtype: EventNames
  avatar: string
  name: string
}

function UserCalender({ date, setDate }: { date: Date }) {
  // const [date, setDate] = useState<Date | undefined>(new Date())
  const [viewingEvents, setViewingEvents] = useState(false)

  return (
    <div className="">
      <div className="mx-auto flex w-fit flex-col gap-y-2  py-4">
        {/* <p className="primary-text text-left ">Your events</p> */}
        <Calendar mode="single" selected={date} onSelect={setDate} className=" w-fit max-w-sm rounded-md  border" />
      </div>
      {/* <Event day={date?.toLocaleString('en-US', { day: 'numeric' })} /> */}
    </div>
  )
}

function Event({ event }: { event: Event }) {
  const { date: rawDate, eventtype, avatar, name } = event

  const date = new Date(rawDate).toLocaleString('default', { month: 'short' }) + ' ' + new Date(rawDate).getDay()

  const EventIcon = ({ eventtype }: { eventtype: EventNames }) => {
    let icon

    switch (eventtype) {
      case 'DATE':
        icon = <Table size={38} color="white" />
        break
      case 'PHOTO':
        icon = <Camera size={38} color="white" />

        break
      case 'VIDEO':
        icon = <Video size={38} color="white" />
        break
      default:
        break
    }

    return <>{icon}</>
  }

  return (
    <div className="mx-auto max-w-lg rounded-lg border bg-black p-2 ">
      <div className="flex justify-between ">
        <div className="flex gap-x-2">
          <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt="" />
          <div className="">
            <p className=" text-light first-letter:uppercase">{name}</p>
            <p className="text-sm text-light">Pending</p>
          </div>
        </div>
        <div className="">
          <EventIcon eventtype={eventtype} />
          {/* <p className="text-light"> {date}</p> */}
        </div>
      </div>
      <UserCalender date={new Date(rawDate)} />
      <div className="pt-4">
        <Button variant={'destructive'} className="w-full">
          <p>Cancel</p>
        </Button>
      </div>
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
    <>
      <Header base />
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
          <div className="space-y-6 px-2 pb-14">
            {events?.map((event, index) => (
              <Event key={index} event={event} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="calendar">
          <UserCalender />
        </TabsContent>
      </Tabs>
    </>
  )
}
