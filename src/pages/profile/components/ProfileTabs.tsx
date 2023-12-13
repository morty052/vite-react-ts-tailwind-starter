import { Button } from 'src/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Camera, Lock, Table, Video } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent } from '../../../components/ui/dialog'
import { useChatContextParams } from 'src/contexts/ChatContext'

function SubscribeToView() {
  return (
    <div className="mx-auto mt-4 max-w-sm space-y-4 rounded-lg bg-white px-6 py-2">
      <div className="flex justify-between">
        <p className="text-dark">45</p>
        <Lock size={18} color="black" />
      </div>
      <Button className="rounded-xl" size={'lg'}>
        <span className="text-sm">Subscribe to view private media</span>
      </Button>
    </div>
  )
}

function MediaReel({ reel }) {
  return (
    <div className="flex flex-col gap-y-4 px-1">
      {reel?.map((url: string, index: number) => {
        return (
          <div className="mx-auto max-w-lg" key={index}>
            <img className="w-full rounded-lg " src={url} alt="" />
          </div>
        )
      })}
    </div>
  )
}

function EventBookingModal({ open, setOpen, eventName, handleCreateEvent }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="mt-4  px-2">
          <div className="flex justify-center space-y-4 rounded-lg bg-red-300 p-6">
            <div className="text-center">
              <p className="">{eventName}</p>
              <p className="text-sm">Spend 10 credits to request a custom photo</p>
              <Button onClick={handleCreateEvent} size={'lg'}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EventBooker({ bunny_id }) {
  const [eventName, setEventName] = useState('')
  const [open, setopen] = useState(false)

  /**
   * Handles the event booking.
   * Handles opening the modal.
   * Sets the event name for the modal.
   * @param {string} event - The name of the event.
   * @return {void} This function does not return anything.
   */
  const handleEventBooking = (event: string) => {
    setEventName(event)
    console.log(event)
    setopen(true)
  }

  const { username } = useChatContextParams()
  const confirmEventBooking = async () => {
    console.log(bunny_id, eventName, username)
    const res = await fetch(
      `http://192.168.100.16:3000/users/createevent?bunny_id=${bunny_id}&eventtype=${eventName}&username=${username}`,
    )
    const data = await res.json()
    console.log(data)
    setopen(false)
  }

  const VideoChatButton = () => {
    return (
      <button
        onClick={() => handleEventBooking('VIDEO')}
        className="flex w-full max-w-sm items-center justify-between rounded-lg border px-4 py-2"
      >
        <span className=" text-lg text-light">Video Chat</span>
        <Video color="pink" strokeWidth={2} size={34} />
      </button>
    )
  }

  const CustomPhotos = () => {
    return (
      <button
        onClick={() => handleEventBooking('PHOTO')}
        className="flex w-full max-w-sm items-center justify-between rounded-lg border px-4 py-2"
      >
        <span className=" text-lg text-light">Custom Photo</span>
        <Camera color="pink" strokeWidth={2} size={34} />
      </button>
    )
  }

  const DateButton = () => {
    return (
      <button
        onClick={() => handleEventBooking('DATE')}
        className="flex w-full max-w-sm items-center justify-between rounded-lg border px-4 py-2"
      >
        <span className=" text-lg text-light">Date</span>
        <Table color="pink" strokeWidth={2} size={34} />
      </button>
    )
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center space-y-4 p-2 pb-20">
      <VideoChatButton />
      <CustomPhotos />
      <DateButton />
      <EventBookingModal handleCreateEvent={confirmEventBooking} eventName={eventName} open={open} setOpen={setopen} />
    </div>
  )
}

export function ProfileTabs({ reel, bunny_id }: { reel: string[]; bunny_id: string }) {
  return (
    <Tabs defaultValue="media" className=" w-full">
      <TabsList className="flex bg-transparent">
        <TabsTrigger className=" tab_trigger data-[state=active]:text-white " value="media">
          Media
        </TabsTrigger>
        <TabsTrigger className="tab_trigger data-[state=active]:text-white " value="book">
          Book
        </TabsTrigger>
      </TabsList>
      <TabsContent className="pb-16" value="media">
        <MediaReel reel={reel} />
        <SubscribeToView />
      </TabsContent>
      <TabsContent value="book">
        <EventBooker bunny_id={bunny_id} />
      </TabsContent>
    </Tabs>
  )
}
