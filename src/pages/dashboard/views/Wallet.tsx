import { ChevronDown, CreditCard, PlusCircle, RabbitIcon } from 'lucide-react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

type order = {
  _id: string
  date: string
  event: string
  avatar: string
  name: string
  amount: string
}

const Order = ({ order }: { order: order }) => {
  const { date, event, avatar, name, amount } = order ?? {}
  return (
    <div className="flex justify-between border-b p-2">
      <div className="flex items-center gap-x-2">
        <img src={avatar} className="h-8 w-8 rounded-full object-cover" alt="" />
        <div className="">
          <p className="text-sm text-light">{name}</p>
          <p className="text-xs text-light">{event}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm text-light">{amount}</p>
        <p className="text-xs text-light">{date}</p>
      </div>
    </div>
  )
}

const WalletActionsButton = ({ credits }: { credits: number }) => {
  return (
    <div className="flex items-center justify-between border p-2">
      <Link to="/dashboard/packages" className="flex items-center gap-x-2">
        <PlusCircle color="pink" />
        <p className="text-sm text-light">Add Credits</p>
      </Link>
      <div className="flex gap-x-2">
        <RabbitIcon color="pink" />
        <p className="font-semibold text-light">{credits}</p>
      </div>
    </div>
  )
}

const AddcardButton = ({ credits }: { credits: number }) => {
  return (
    <div className="flex items-center justify-between border p-2">
      <Link to="/dashboard/packages" className="flex items-center gap-x-2">
        <PlusCircle color="pink" />
        <p className="text-sm text-light">Add Card</p>
      </Link>
      <div className="flex gap-x-2">
        <CreditCard color="pink" />
      </div>
    </div>
  )
}

const OrdersHeader = () => {
  return (
    <div className="flex items-center justify-between border-b p-2">
      <p className="text-sm text-light">Wallet Activity</p>
      <div className="flex gap-x-2">
        <ChevronDown color="pink" />
      </div>
    </div>
  )
}

const UserOrders = ({ orders }: { orders: order[] }) => {
  return (
    <div className="py-4">
      {orders.length < 1 ? (
        <p className="primary-text text-center">No recent activities </p>
      ) : (
        orders.map((order: order, index) => <Order key={index} order={order} />)
      )}
    </div>
  )
}

const Packages = () => {
  return (
    <div className="py-4">
      <p className="primary-text"> Packages</p>
    </div>
  )
}

const CardForm = () => {
  return (
    <div className="px-2 py-4">
      <p className="primary-text">Billing Details</p>

      <span className="text-light">Country</span>
      <input className="w-full rounded-lg border bg-transparent p-2 text-light" type="text" />
    </div>
  )
}

const WalletView = ({ credits, orders }: { credits: number; orders: order[] }) => {
  return (
    <>
      <WalletActionsButton credits={credits as number} />
      <AddcardButton credits={credits as number} />
      <CardForm />
      <OrdersHeader />
      <UserOrders orders={orders} />
    </>
  )
}

export function Wallet() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [credits, setCredits] = useState<null | number>(null)

  const { username } = useChatContextParams()

  const getUserCredits = async () => {
    const balanceRequest = await fetch(`http://192.168.100.16:3000/users/credits?username=${username}`)
    const balanceData = await balanceRequest.json()
    const { credits } = balanceData
    return credits
  }

  const getOrders = async () => {
    const res = await fetch(`http://192.168.100.16:3000/users/orders?username=${username}`)
    const data = await res.json()
    const { orders } = data
    const credits = await getUserCredits()

    // set credits if they exist
    if (credits) {
      setCredits(credits)
    }

    // if no orders exist return
    if (!orders) {
      console.log('no orders found')
      setOrders([])
      setLoading(false)
      return
    }

    // finally set orders if they exist
    setOrders(orders)
    setLoading(false)
  }

  useEffect(() => {
    if (!username) {
      return
    }
    getOrders()
  }, [username])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<WalletView credits={credits as number} orders={orders} />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </div>
  )
}
