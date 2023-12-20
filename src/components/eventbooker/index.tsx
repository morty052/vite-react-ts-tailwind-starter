import { Video, Camera, Table, RabbitIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'

type Props = {}

type EventTypes = 'VIDEO' | 'PHOTO' | 'DATE'

function EventBookingModal({ open, setOpen, eventName, handleCreateEvent, insufficientBalance }) {
  const EventConfirmation = () => {
    return (
      <div className="mt-4  px-2">
        <div className="flex justify-center space-y-4 rounded-lg bg-white p-6">
          <div className="space-y-4 text-center">
            <p className="">{eventName}</p>
            <div className="flex items-center gap-x-2">
              <span className="text-sm">Spend </span>
              <a className="flex gap-x-1">
                <span className=" font-semibold text-dark">40</span>
                <RabbitIcon color="pink" />
              </a>
              <span>To book a video chat</span>
            </div>
            <Button onClick={handleCreateEvent} size={'lg'}>
              Confirm
            </Button>
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
          <div className="space-y-4 text-center">
            <p className=" first-letter:uppercase">Purchase more credits to book {event}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>{!insufficientBalance ? <EventConfirmation /> : <PurchaseCredits />}</DialogContent>
    </Dialog>
  )
}

export function EventBooker({ bunny_id }) {
  const [eventName, setEventName] = useState<EventTypes | undefined>(undefined)
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [open, setopen] = useState(false)

  const { username } = useChatContextParams()

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
    setopen(true)
  }

  const getEventDetails = (eventName: EventTypes): number | undefined => {
    let price: number
    switch (eventName) {
      case 'PHOTO':
        price = 100
        return price
      case 'VIDEO':
        price = 200
        return price
      case 'DATE':
        price = 500
        return price

      default:
        price = 0
        return price
    }
  }

  const checkBalance = async (purchaseAmount: number) => {
    const balanceRequest = await fetch(`http://192.168.100.16:3000/users/credits?username=${username}`)
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
    const newSpendRequest = await fetch(
      `http://192.168.100.16:3000/users/spend?username=${username}&amount=${purchaseAmount}`,
    )
    const balanceData = await newSpendRequest.json()
    const { balance } = balanceData
    console.log('new balance is ', balance)
  }

  const confirmEventBooking = async () => {
    console.log(bunny_id, eventName, username)
    const purchaseAmount = getEventDetails(eventName as EventTypes)
    const balance = await checkBalance(purchaseAmount as number)

    if (!balance) {
      console.log('not enough credits', balance)
      setInsufficientBalance(true)
      return
    }

    const res = await fetch(
      `http://192.168.100.16:3000/users/createevent?bunny_id=${bunny_id}&eventtype=${eventName}&username=${username}`,
    )
    await decBalance(purchaseAmount as number)
    const data = await res.json()
    console.log(data)
    setopen(false)
  }

  const VideoChatButton = () => {
    return (
      <button
        onClick={() => handleEventBooking('VIDEO')}
        className="flex w-full max-w-md items-center justify-between rounded-lg border px-4 py-2"
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
        <span className=" text-lg text-light">Date</span>
        <Table color="pink" strokeWidth={2} size={34} />
      </button>
    )
  }

  const eventModalProps = {
    insufficientBalance,
    handleCreateEvent: confirmEventBooking,
    eventName,
    open,
    setOpen: setopen,
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
      </div>
    </div>
  )
}
