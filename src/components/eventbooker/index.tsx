import { Video, Camera, Table } from 'lucide-react'
import React, { useState } from 'react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

type Props = {}

type EventTypes = 'VIDEO' | 'PHOTO' | 'DATE'

type EventBookerProps = {
  pricing: {
    photo_price: number
    video_price: number
    date_price: number
  }
  bunny_id: string
  avatar: string
  bunny_name: string
  bunny_username: string
}

function EventBookingModal(props) {
  const {
    open,
    setOpen,
    eventName,
    handleCreateEvent,
    insufficientBalance,
    pricing,
    avatar,
    loading,
    bunny_name,
    bunny_username,
  } = props
  const { photo_price, video_price, date_price } = pricing ?? {}

  const EventPrice = ({ eventName }: { eventName: EventTypes }) => {
    let price

    switch (eventName) {
      case 'DATE':
        price = date_price
        break
      case 'PHOTO':
        price = photo_price

        break
      case 'VIDEO':
        price = video_price
        break
      default:
        break
    }

    return <p className="text-xl font-medium text-light">${price}</p>
  }

  function ConfirMationButton() {
    return (
      <div className=" space-y-2">
        <Button
          disabled={insufficientBalance}
          className="w-full max-w-md bg-fuchsia-500"
          onClick={() => handleCreateEvent(photo_price)}
          size={'lg'}
        >
          {loading ? 'Booking...' : 'Confirm'}
        </Button>
        <p className="text-center text-xs">Estimated delivery times may increase based on your custom request.</p>
      </div>
    )
  }

  const Header = () => {
    return (
      <>
        <div className="z-10 flex w-full  items-center justify-between ">
          <div className="flex  items-center justify-center gap-x-2 ">
            <img className="h-14 w-14 rounded-full object-cover" src={avatar} alt="" />
            <div className="">
              <p>{bunny_name}</p>
              <p className="text-xs">@{bunny_username}</p>
            </div>
          </div>
          <div className="">
            <EventPrice eventName={eventName} />
          </div>
        </div>
      </>
    )
  }

  const PhotoBookingPopUp = () => {
    return (
      <div className="relative mt-4 px-2 text-light">
        <div className="  flex rounded-lg bg-dark px-2 py-6">
          <div className="mx-auto w-full max-w-md  space-y-6 ">
            <Header />
            <div className="flex w-full justify-center">
              <Camera size={150} />
            </div>
            <div className="space-y-1">
              <p className="text-center text-light ">Estimated delivery 20 minutes</p>
              <ConfirMationButton />
            </div>
          </div>
        </div>
      </div>
    )
  }
  const VideoBookingPopUp = () => {
    return (
      <div className="relative mt-4 px-2 text-light">
        <div className="  flex rounded-lg bg-dark px-2 py-6">
          <div className="mx-auto w-full max-w-md  space-y-6 ">
            <Header />
            <div className="flex w-full justify-center">
              <Video size={150} />
            </div>
            <div className="space-y-1">
              <p className="text-center text-light ">Estimated delivery 20 minutes</p>
              <ConfirMationButton />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // TODO: GET DEDICATED ICON FOR DATE EVENT
  const DateBookingPopUp = () => {
    return (
      <div className="relative mt-4 px-2 text-light">
        <div className="  flex rounded-lg bg-dark px-2 py-6">
          <div className="mx-auto w-full max-w-md  space-y-6 ">
            <Header />
            <div className="flex w-full justify-center">
              <Table size={150} />
            </div>
            <div className="space-y-1">
              <p className="text-center text-light ">Estimated delivery 20 minutes</p>
              <ConfirMationButton />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const SuccessPopUp = () => {
    const Header = () => {
      return (
        <>
          <div className="z-10 flex w-full  items-center justify-between ">
            <div className="flex  items-center justify-center gap-x-2 ">
              <img className="h-14 w-14 rounded-full object-cover" src={avatar} alt="" />
              <div className="">
                <p>Bobby</p>
                <p className="text-xs">@bobbylee</p>
              </div>
            </div>
            <div className="">
              <p className="text-lg font-semibold">{photo_price}</p>
            </div>
          </div>
        </>
      )
    }

    function ConfirMationButton() {
      return (
        <div className=" space-y-2">
          {/* <p className="text-center text-light ">Spend {photo_price} to order a custom photo </p> */}
          <Button
            disabled={insufficientBalance}
            className="w-full max-w-md bg-fuchsia-500"
            onClick={() => handleCreateEvent(photo_price)}
            size={'lg'}
          >
            {loading ? 'Confirming...' : 'Confirm'}
          </Button>
          <p className="text-center text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      )
    }

    return (
      <div className="relative mt-4 px-2 text-light">
        <div className="  flex rounded-lg bg-dark px-2 py-6">
          <div className="mx-auto w-full max-w-md  space-y-6 ">
            <Header />
            <div className="flex w-full justify-center">
              <Camera size={150} />
            </div>
            <ConfirMationButton />
          </div>
        </div>
      </div>
    )
  }

  const PurchaseCredits = () => {
    const event = eventName.toLowerCase()
    return (
      <div className="mt-4  px-2">
        <div className="flex justify-center space-y-4 rounded-lg bg-white p-6">
          <div className="space-y-2 text-center">
            <img
              className="mx-auto w-3/5"
              src="https://img.freepik.com/free-vector/wallet-money-element-illustration_32991-907.jpg?size=338&ext=jpg&ga=GA1.1.675358736.1703537895&semt=ais"
              alt=""
            />
            <p className=" first-letter:uppercase">Purchase more credits to continue booking</p>
            <Link to={'/dashboard/wallet/packages'} className="w-full ">
              <Button className="w-full max-w-md bg-fuchsia-500" size={'lg'}>
                Add Credits
              </Button>
            </Link>
            <p className="font-medium text-blue-700">Pay to bunny directly.</p>
          </div>
        </div>
      </div>
    )
  }

  const popUps = {
    PHOTO: <PhotoBookingPopUp />,
    VIDEO: <VideoBookingPopUp />,
    DATE: <DateBookingPopUp />,
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>{!insufficientBalance ? popUps[eventName as EventTypes] : <PurchaseCredits />}</DialogContent>
    </Dialog>
  )
}

function QuickPickTab({ setCustomRequest, bunny_name, selectedTags, setSelectedTags }) {
  const tags = ['NFSW', 'Role Playing', 'Costume']

  const isIncluded = selectedTags?.includes([...tags])

  const handleRemoveTag = (tag) => {
    setSelectedTags((prev) => [...prev, tag])
  }

  return (
    <div className=" self-start">
      <p>Tell {bunny_name} what you would like to see.</p>
      <div className="flex gap-x-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleRemoveTag(tag)}
            className={`flex h-8 w-24 items-center justify-center rounded-lg  p-2 text-sm hover:bg-fuchsia-600 ${
              selectedTags?.includes(tag) ? 'bg-fuchsia-500' : 'bg-slate-500'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

function CustomizationTextArea({ setSelectedTags, selectedTags, CustomRequest, setCustomRequest }) {
  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  return (
    <div className="w-full max-w-md space-y-2 rounded-lg border bg-white p-2">
      {selectedTags.length > 0 && (
        <div className="flex gap-x-2">
          {selectedTags.map((tag: string, index: number) => (
            <div key={index} className="">
              <button
                onClick={() => handleRemoveTag(tag)}
                className="flex h-8 w-24 items-center justify-center rounded-lg bg-fuchsia-500 p-2 text-sm hover:bg-fuchsia-600"
              >
                {tag}
              </button>
            </div>
          ))}
        </div>
      )}
      <textarea
        placeholder="Type custom request."
        value={CustomRequest}
        onChange={(e) => setCustomRequest(e.target.value)}
        rows={5}
        className="text_area relative w-full rounded-md bg-transparent   px-2 text-dark  focus:outline-none"
      ></textarea>
    </div>
  )
}

function CustomizationModal(props) {
  const { open, setOpen, handleCreateEvent, pricing, avatar, bunny_name, eventName } = props
  const { photo_price } = pricing ?? {}

  const [loading, setLoading] = useState(false)
  const [CustomRequest, setCustomRequest] = useState('')
  const [selectedTags, setSelectedTags] = useState<[] | string[]>([])

  function HandleSelectedtags(selectedTag: string) {
    setSelectedTags((prev) => [...prev, selectedTag])
  }

  function handleConfirmation() {
    setCustomRequest('')
    setSelectedTags([])
    handleCreateEvent({ CustomRequest, selectedTags, eventName })
  }
  function handleClose() {
    setCustomRequest('')
    setSelectedTags([])
    setOpen(false)
    // handleCreateEvent({ CustomRequest, selectedTags, eventName })
  }

  const EventIcon = ({ eventName }: { eventName: EventTypes }) => {
    let icon

    switch (eventName) {
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

  const Header = () => {
    return (
      <>
        <div className="z-10 flex w-full  items-center justify-between ">
          <div className="flex  items-center justify-center gap-x-2 ">
            <img className="h-14 w-14 rounded-full object-cover" src={avatar} alt="" />
            <div className="">
              <p>{bunny_name}</p>
              <p className="text-xs">@bobbylee</p>
            </div>
          </div>
          <div className="">
            <EventIcon eventName={eventName} />
          </div>
        </div>
      </>
    )
  }
  function ConfirMationButton() {
    return (
      <div className=" space-y-2">
        {/* <p className="text-center text-light ">Spend {photo_price} to order a custom photo </p> */}
        <Button className="w-full max-w-md bg-fuchsia-500" onClick={() => handleConfirmation()} size={'lg'}>
          {loading ? 'Confirming...' : 'Confirm'}
        </Button>
        <p className="text-center text-xs">Estimated delivery times may increase based on your custom request.</p>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <div className="relative mt-4 px-2 text-light">
          <div className="  flex rounded-lg bg-dark px-2 py-6">
            <div className="mx-auto w-full max-w-md  space-y-6 ">
              <Header />
              <div className="flex flex-col items-center justify-center space-y-2">
                <QuickPickTab
                  setSelectedTags={setSelectedTags}
                  selectedTags={selectedTags}
                  bunny_name={bunny_name}
                  setCustomRequest={(r: string) => HandleSelectedtags(r)}
                />
                <CustomizationTextArea
                  setSelectedTags={setSelectedTags}
                  selectedTags={selectedTags}
                  CustomRequest={CustomRequest}
                  setCustomRequest={setCustomRequest}
                />
              </div>
              <ConfirMationButton />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function EventBooker({ bunny_id, pricing, avatar, bunny_name, bunny_username }: EventBookerProps) {
  const [eventName, setEventName] = useState<EventTypes | undefined>(undefined)
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [open, setopen] = useState(false)
  const [loading, setloading] = useState(false)

  const { username } = useChatContextParams()

  const getEventDetails = (eventName: EventTypes): number | undefined => {
    let price: number
    switch (eventName) {
      case 'PHOTO':
        price = photo_price
        return price
      case 'VIDEO':
        price = video_price
        return price
      case 'DATE':
        price = date_price
        return price

      default:
        price = 0
        return price
    }
  }

  /**
   * Handles the event booking.
   * Handles opening the modal.
   * Sets the event name for the modal.
   * @param {string} event - The name of the event.
   * @return {void} This function does not return anything.
   */
  const handleEventBooking = (event: EventTypes) => {
    if (insufficientBalance) {
      setInsufficientBalance(false)
    }
    setEventName(event)
    console.log(event)
    setCustomizing(true)
  }

  const initiateBookingConfirmation = async (data: {
    CustomRequest: string
    selectedTags: string[]
    eventName: EventTypes
  }) => {
    const { CustomRequest, selectedTags, eventName } = data
    setEventName(eventName)
    setCustomizing(false)
    setopen(true)
    console.log(data)
  }

  const checkBalance = async (purchaseAmount: number) => {
    const _id = localStorage.getItem('_id')
    const balanceRequest = await fetch(`http://192.168.100.16:3000/users/credits?_id=${_id}`)
    const balanceData = await balanceRequest.json()
    const { credits } = balanceData
    console.log('user balance is ', credits)
    if (credits >= purchaseAmount) {
      return true
    } else {
      return false
    }
  }

  const decBalance = async (purchaseAmount: number) => {
    const _id = localStorage.getItem('_id')
    const newSpendRequest = await fetch(`http://192.168.100.16:3000/users/spend?_id=${_id}&amount=${purchaseAmount}`)
    const balanceData = await newSpendRequest.json()
    const { balance } = balanceData
    console.log('new balance is ', balance)
  }

  const confirmEventBooking = async (price) => {
    const _id = localStorage.getItem('_id')
    const balance = await checkBalance(price as number)

    setloading(true)

    if (!balance) {
      console.log('not enough credits', balance)
      setInsufficientBalance(true)
      setloading(false)
      return
    }

    const res = await fetch(
      `http://192.168.100.16:3000/users/createevent?bunny_id=${bunny_id}&eventtype=${eventName}&_id=${_id}`,
    )
    await decBalance(price as number)
    const data = await res.json()
    setloading(false)
    setopen(false)
    toast.success('Event booked')
  }

  const VideoChatButton = () => {
    return (
      <button
        onClick={() => handleEventBooking('VIDEO')}
        className="flex w-full max-w-md items-center justify-between rounded-lg border px-4 py-2"
      >
        <span className=" text-lg text-light">Custom Video</span>
        <Video color="pink" strokeWidth={2} size={34} />
      </button>
    )
  }

  const CustomPhotos = () => {
    return (
      <button
        onClick={() => handleEventBooking('PHOTO')}
        className="flex w-full max-w-md items-center justify-between rounded-lg border px-4 py-2"
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
        className="flex w-full max-w-md items-center justify-between rounded-lg border px-4 py-2"
      >
        <span className=" text-lg text-light">Video Call</span>
        <Table color="pink" strokeWidth={2} size={34} />
      </button>
    )
  }

  const eventModalProps = {
    insufficientBalance,
    handleCreateEvent: (price: number) => confirmEventBooking(price),
    eventName,
    bunny_name,
    bunny_username,
    open,
    setOpen: setopen,
    pricing,
    avatar,
    loading,
  }

  return (
    <div className=" w-full px-2">
      <div className="mx-auto flex max-w-md  flex-col items-center space-y-4 px-2 py-4 ">
        <div className="self-start">
          <p className="primary-text text-left">Booking</p>
        </div>
        <VideoChatButton />
        <CustomPhotos />
        <DateButton />
        <EventBookingModal {...eventModalProps} />
        <CustomizationModal
          bunny_name={bunny_name}
          open={customizing}
          setOpen={setCustomizing}
          pricing={pricing}
          avatar={avatar}
          eventName={eventName}
          handleCreateEvent={(event: { CustomRequest: string; selectedTags: string[]; eventName: EventTypes }) =>
            initiateBookingConfirmation(event)
          }
        />
      </div>
    </div>
  )
}
