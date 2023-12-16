import { ChevronDown, PlusCircle, RabbitIcon } from 'lucide-react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { useState, useEffect } from 'react'

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

const WalletActionsButton = () => {
  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex items-center gap-x-2">
        <PlusCircle color="pink" />
        <p className="text-sm text-light">Add Credits</p>
      </div>
      <div className="flex gap-x-2">
        <RabbitIcon color="pink" />
        <p className="font-semibold text-light">100</p>
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

export function Wallet() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const { username } = useChatContextParams()

  const getOrders = async () => {
    const res = await fetch(`http://192.168.100.16:3000/users/orders?username=${username}`)
    const data = await res.json()
    const { orders } = data
    if (!orders) {
      setLoading(false)
      return
    }
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
      <WalletActionsButton />
      <OrdersHeader />
      <UserOrders orders={orders} />
    </div>
  )
}
