import { Calendar } from 'src/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { useState } from 'react'
import { Camera, Table, Video } from 'lucide-react'
import { Button } from 'src/components/ui/button'
import { ChatButton, EmptyState } from 'src/components'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'src/components/ui/skeleton'

type EventNames = 'DATE' | 'PHOTO' | 'VIDEO'
type Event = {
  date: string
  eventtype: EventNames
  avatar: string
  name: string
  bunny_id: string
  username: string
}

type Props = {
  day: string | undefined
}

function UserCalender({ date, setDate }: { date?: Date; setDate?: any }) {
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
  const { date: rawDate, eventtype, avatar, name, username, bunny_id } = event

  const time = new Date(rawDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
  const day = new Date(rawDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })

  const EventIcon = ({ eventtype }: { eventtype: EventNames }) => {
    let icon

    switch (eventtype) {
      case 'DATE':
        icon = <Table size={38} color="white" />
        break
      case 'PHOTO':
        icon = <Camera size={150} color="white" />

        break
      case 'VIDEO':
        icon = <Video size={150} color="white" />
        break
      default:
        break
    }

    return <>{icon}</>
  }

  const EventHeader = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2">
          <img className="h-14 w-14 rounded-full object-cover" src={avatar} alt="" />
          <div className="">
            <p className=" text-light first-letter:uppercase">{name}</p>
            <p className=" text-sm text-light">@{username}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <ChatButton bunny_id={bunny_id} />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg rounded-lg border bg-black p-2 ">
      <EventHeader />
      <div className="flex w-full flex-col items-center justify-center ">
        <EventIcon eventtype={eventtype} />
      </div>
      <div className="pt-8">
        <Button variant={'destructive'} className="w-full">
          <p>Cancel</p>
        </Button>
      </div>
    </div>
  )
}

const Feed = ({ items, loading }: any) => {
  const FeedSkeleton = () => {
    return (
      <div className="space-y-6 divide-y">
        <div className="mx-2 space-y-2 py-4">
          <Skeleton className="h-48 w-full bg-dark" />
        </div>
        <div className="mx-2 space-y-2 py-4">
          <Skeleton className="h-48 w-full bg-dark" />
        </div>
        <div className="mx-2 space-y-2 py-4">
          <Skeleton className="h-48 w-full bg-dark" />
        </div>
      </div>
    )
  }

  if (loading) {
    return <FeedSkeleton />
  }

  return (
    <div className="space-y-6 px-2 pb-14">
      {items?.map((event: Event, index: number) => {
        return (
          <div key={index} className="">
            <Event key={index} event={event} />
          </div>
        )
      })}
    </div>
  )
}

export function EventsPage() {
  // const [events, setEvents] = useState<Event[]>([])
  // const { username } = useChatContextParams()

  const _id = localStorage.getItem('_id')

  // TODO: CHANGE SERVER URL
  async function getEvents() {
    const res = await fetch(`http://192.168.100.16:3000/users/events?_id=${_id}`)
    const data = await res.json()
    const { events } = data
    return events
  }

  const { isLoading, data: events } = useQuery({ queryKey: ['events'], queryFn: getEvents })

  // useEffect(() => {
  //   if (!username) {
  //     return
  //   }
  //   getEvents()
  // }, [username])

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      <Tabs defaultValue="events" className=" w-full">
        <TabsList className="flex bg-transparent">
          <TabsTrigger className=" tab_trigger data-[state=active]:text-white " value="events">
            Events
          </TabsTrigger>
          <TabsTrigger className="tab_trigger data-[state=active]:text-white " value="calendar">
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <Feed items={events} loading={isLoading} />
        </TabsContent>
        <TabsContent value="calendar">
          <EmptyState description="No completed events" />
        </TabsContent>
      </Tabs>
    </>
  )
}
