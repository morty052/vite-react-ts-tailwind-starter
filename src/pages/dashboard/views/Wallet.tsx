import { ChevronDown, ChevronUp, CreditCard, DollarSign, PlusCircle, RabbitIcon } from 'lucide-react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { EmptyState, Loader } from 'src/components'

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
  const orderDate = new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric' })
  return (
    <div className="flex justify-between border-b p-2">
      <div className="flex items-center gap-x-2">
        <img src={avatar} className="h-8 w-8 rounded-full object-cover" alt="" />
        <div className="">
          <p className="text-sm text-light first-letter:uppercase">{name}</p>
          <p className="text-xs text-light">{event}</p>
        </div>
      </div>
      <div className="flex flex-col items-end ">
        <div className="flex items-center gap-x-2">
          <p className=" font-semibold text-red-500">- {amount}</p>
          <RabbitIcon color="pink" />
        </div>
        <p className="text-xs text-light">{orderDate}</p>
      </div>
    </div>
  )
}

const WalletActionsButton = ({ credits }: { credits: number }) => {
  return (
    <div className="flex items-center justify-between  p-2">
      <div className="flex items-center gap-x-2">
        <div className="">
          <p className="font-medium text-light">Credits</p>
          <div className="flex items-center gap-x-2">
            <p className="text-2xl font-semibold text-light">{credits ? credits : 0}</p>
            <DollarSign color="pink" />
          </div>
        </div>
      </div>
      <Link to="/dashboard/wallet/packages" className="flex items-center gap-x-2 text-fuchsia-500">
        <p className="text-sm font-semibold text-light hover:text-blue-700">Add Credits</p>
        <PlusCircle />
      </Link>
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

const OrdersHeader = ({
  setTransactionsExpanded,
  transactionsExpanded,
}: {
  setTransactionsExpanded: any
  transactionsExpanded: boolean
}) => {
  return (
    <div className="mt-2 flex items-center justify-between rounded-md border p-2">
      <p className="text-sm text-light">Wallet Activity</p>
      <div className="flex gap-x-2">
        {transactionsExpanded ? (
          <a
            className="flex cursor-pointer items-center gap-x-2 font-semibold text-light"
            onClick={() => setTransactionsExpanded(!transactionsExpanded)}
          >
            Hide <ChevronUp size={18} />
          </a>
        ) : (
          <a
            className="flex cursor-pointer items-center gap-x-2 font-semibold text-light"
            onClick={() => setTransactionsExpanded(!transactionsExpanded)}
          >
            Show <ChevronDown size={18} />
          </a>
        )}
      </div>
    </div>
  )
}

const UserOrders = ({ orders, transactionsExpanded }: { orders: order[]; transactionsExpanded: boolean }) => {
  return (
    <>
      {transactionsExpanded && (
        <div className="py-4">
          {orders.length < 1 ? (
            <p className="primary-text text-center">No recent activities </p>
          ) : (
            orders.map((order: order, index) => <Order key={index} order={order} />)
          )}
        </div>
      )}
    </>
  )
}
const Package = ({ price }: { price: number }) => {
  return (
    <div className="max-w-smd relative mx-auto rounded-lg">
      <div className=" absolute top-0 flex items-center gap-x-2 p-2 ">
        <p className=" text-5xl text-light">${price}</p>
      </div>
      <div className="">
        <img
          className="rounded-lg"
          src="https://img.freepik.com/free-psd/3d-safe-box-with-golden-dollar-coins_23-2148938918.jpg?size=626&ext=jpg&ga=GA1.1.1108328508.1702808723&semt=ais"
          alt=""
        />
      </div>
    </div>
  )
}

export const Packages = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<number | string>('')
  const [tokens, setTokens] = useState(0)

  const AcceptedCoins = () => {
    return (
      <div className="grid max-w-xs grid-cols-6 ">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"
          alt=""
        />
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png"
          alt=""
        />
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png"
          alt=""
        />
      </div>
    )
  }

  const handlePurchase = async () => {
    const res = await fetch(`http://192.168.100.16:3000/users/create-charge?amount=${purchaseAmount}`)
    const data = await res.json()
    const { hosted_url } = data
    window.open(hosted_url, '_blank')

    console.log(data)
  }
  const handlePriceChange = async (e) => {
    if (isNaN(Number(e.target.value))) {
      return
    }

    setPurchaseAmount(Number(e.target.value))
  }

  // useEffect(() => {
  //   if (purchaseAmount && (purchaseAmount as number) > 500001) {
  //     console.log('exceeded amount', purchaseAmount)
  //     setPurchaseAmount(50000)
  //   }
  // }, [purchaseAmount])

  return (
    <>
      <section className="">
        <div className="mx-auto max-w-screen-xs space-y-4 px-4   lg:px-6">
          <div className="py-4">
            <p className="text-xl font-medium text-light">Select Amount to add to your wallet.</p>
            <div className="flex items-center gap-x-2">
              <p className="text-light">Powered by </p>
              <img
                className="w-20  object-cover"
                src="https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg"
                alt=""
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="">
              <p className="text-light">Adding</p>
            </div>
            {/* <div className=" flex flex-1 justify-center">
              <Recycle color="white" size={38} />
            </div> */}
            <div className="">
              <p className="text-light">{!purchaseAmount ? 0 : `$${purchaseAmount.toLocaleString()}`}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="">
              <p className="text-light">Purchase Amount</p>
              <input
                placeholder="Enter amount"
                value={purchaseAmount}
                onChange={(e) => handlePriceChange(e)}
                className="w-full max-w-md rounded-lg p-2 text-center"
                type="text"
              />
            </div>
            <Button className="w-full bg-fuchsia-500" onClick={handlePurchase}>
              Confirm Purchase
            </Button>
            <div className="flex gap-x-2">
              <p className="text-blue-700">Pay with Card instead</p>
              <CreditCard color="white" />
            </div>
            <p className="text-light">Accepted Coins</p>
            <AcceptedCoins />
          </div>
        </div>
      </section>
    </>
  )
}

const CardForm = () => {
  const [open, setOpen] = useState(false)

  const AcceptedCards = () => {
    return (
      <div className="grid max-w-xs grid-cols-6 ">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAflBMVEUAAADy8/Xy8/Xy8/Xy8/Xy8/UAUJi1yt72pQB5ocYdZKM8eK8OWp3E1OPU3+nj6e9ajbumwNiXttItbqlLgrWIq8xpl8DzuUD2sijy7ubz6db01JEPVY7vpQvz37jz26i/uJQuYHv0zHpNa2j1wluKhVGrkT+giTrElyrUnSDuLh2LAAAABXRSTlMA8KAgMC4oWXgAAAIfSURBVGje7ZjZcuMgEEXHTgAjIdBiy1lnX///BwfTi6h5mU6VqUoqfV4ssOjb3G5ZLj4oiqIoivKauNnvzFXZ7W/q+LcQ/roSt1X+EP/aCtse9qYJexbYmSbsWMA0QgVUQAVUoLHA4DLx5QJ3B+L7PcxEe6HDT1/m3NECwRtgDZfhItjB/SNpPOJSDOzK5ynPpN4yPdzkcZhEFn08F4EzjAKsxBgux1/sBu6gw6GT1SB+e84Cd+V6LgtHY8CVPDPaihluYj1hkZen31nhwWTAjiHPQSlMxFDRJOc7SLlnxwQC6Puvw+ETlBjX0cVULlZT4SwRRAIQ5OfhK1QPjBjIghN01WAQMg23KhHAdP+cqXodaIKSI7sTlwxCB7hBIgAV/fJMYT1vxVUdE0hiLUlAF4wiAfThxwMsCslUTWQg1c2nVMYnSGERCaDjT58j9Sg1EXy5cE0jJWMTepckAuTDCmuj2ZoImMmmI9060i1OIsCN0VFUbiL2EH3iMjnnunIhFJgsM23jqTaxQA8Z0wsFkgXId09dzhbAFkiICUKBLbFTNbwY3a0uZR2Y6MHLmkEo4CmjtBV9oceMmaL9l1kiwB7zk0M9M9uakX9KosssMCcQAI+5Rylxv20MxylUvuOjJhUY66aYqYmmI1dzjNXbokrjPwKS1/3k5+p9/1b/tqiACqjA+xNodZzT/ECq+ZFa60PB5seaiqIoiqK8Iv4CS79siHvGtFUAAAAASUVORK5CYII="
          alt=""
        />
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAflBMVEUAAADy8/Xy8/Xy8/Xy8/Xy8/UAUJi1yt72pQB5ocYdZKM8eK8OWp3E1OPU3+nj6e9ajbumwNiXttItbqlLgrWIq8xpl8DzuUD2sijy7ubz6db01JEPVY7vpQvz37jz26i/uJQuYHv0zHpNa2j1wluKhVGrkT+giTrElyrUnSDuLh2LAAAABXRSTlMA8KAgMC4oWXgAAAIfSURBVGje7ZjZcuMgEEXHTgAjIdBiy1lnX///BwfTi6h5mU6VqUoqfV4ssOjb3G5ZLj4oiqIoivKauNnvzFXZ7W/q+LcQ/roSt1X+EP/aCtse9qYJexbYmSbsWMA0QgVUQAVUoLHA4DLx5QJ3B+L7PcxEe6HDT1/m3NECwRtgDZfhItjB/SNpPOJSDOzK5ynPpN4yPdzkcZhEFn08F4EzjAKsxBgux1/sBu6gw6GT1SB+e84Cd+V6LgtHY8CVPDPaihluYj1hkZen31nhwWTAjiHPQSlMxFDRJOc7SLlnxwQC6Puvw+ETlBjX0cVULlZT4SwRRAIQ5OfhK1QPjBjIghN01WAQMg23KhHAdP+cqXodaIKSI7sTlwxCB7hBIgAV/fJMYT1vxVUdE0hiLUlAF4wiAfThxwMsCslUTWQg1c2nVMYnSGERCaDjT58j9Sg1EXy5cE0jJWMTepckAuTDCmuj2ZoImMmmI9060i1OIsCN0VFUbiL2EH3iMjnnunIhFJgsM23jqTaxQA8Z0wsFkgXId09dzhbAFkiICUKBLbFTNbwY3a0uZR2Y6MHLmkEo4CmjtBV9oceMmaL9l1kiwB7zk0M9M9uakX9KosssMCcQAI+5Rylxv20MxylUvuOjJhUY66aYqYmmI1dzjNXbokrjPwKS1/3k5+p9/1b/tqiACqjA+xNodZzT/ECq+ZFa60PB5seaiqIoiqK8Iv4CS79siHvGtFUAAAAASUVORK5CYII="
          alt=""
        />
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAflBMVEUAAADy8/Xy8/Xy8/Xy8/Xy8/UAUJi1yt72pQB5ocYdZKM8eK8OWp3E1OPU3+nj6e9ajbumwNiXttItbqlLgrWIq8xpl8DzuUD2sijy7ubz6db01JEPVY7vpQvz37jz26i/uJQuYHv0zHpNa2j1wluKhVGrkT+giTrElyrUnSDuLh2LAAAABXRSTlMA8KAgMC4oWXgAAAIfSURBVGje7ZjZcuMgEEXHTgAjIdBiy1lnX///BwfTi6h5mU6VqUoqfV4ssOjb3G5ZLj4oiqIoivKauNnvzFXZ7W/q+LcQ/roSt1X+EP/aCtse9qYJexbYmSbsWMA0QgVUQAVUoLHA4DLx5QJ3B+L7PcxEe6HDT1/m3NECwRtgDZfhItjB/SNpPOJSDOzK5ynPpN4yPdzkcZhEFn08F4EzjAKsxBgux1/sBu6gw6GT1SB+e84Cd+V6LgtHY8CVPDPaihluYj1hkZen31nhwWTAjiHPQSlMxFDRJOc7SLlnxwQC6Puvw+ETlBjX0cVULlZT4SwRRAIQ5OfhK1QPjBjIghN01WAQMg23KhHAdP+cqXodaIKSI7sTlwxCB7hBIgAV/fJMYT1vxVUdE0hiLUlAF4wiAfThxwMsCslUTWQg1c2nVMYnSGERCaDjT58j9Sg1EXy5cE0jJWMTepckAuTDCmuj2ZoImMmmI9060i1OIsCN0VFUbiL2EH3iMjnnunIhFJgsM23jqTaxQA8Z0wsFkgXId09dzhbAFkiICUKBLbFTNbwY3a0uZR2Y6MHLmkEo4CmjtBV9oceMmaL9l1kiwB7zk0M9M9uakX9KosssMCcQAI+5Rylxv20MxylUvuOjJhUY66aYqYmmI1dzjNXbokrjPwKS1/3k5+p9/1b/tqiACqjA+xNodZzT/ECq+ZFa60PB5seaiqIoiqK8Iv4CS79siHvGtFUAAAAASUVORK5CYII="
          alt=""
        />
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAflBMVEUAAADy8/Xy8/Xy8/Xy8/Xy8/UAUJi1yt72pQB5ocYdZKM8eK8OWp3E1OPU3+nj6e9ajbumwNiXttItbqlLgrWIq8xpl8DzuUD2sijy7ubz6db01JEPVY7vpQvz37jz26i/uJQuYHv0zHpNa2j1wluKhVGrkT+giTrElyrUnSDuLh2LAAAABXRSTlMA8KAgMC4oWXgAAAIfSURBVGje7ZjZcuMgEEXHTgAjIdBiy1lnX///BwfTi6h5mU6VqUoqfV4ssOjb3G5ZLj4oiqIoivKauNnvzFXZ7W/q+LcQ/roSt1X+EP/aCtse9qYJexbYmSbsWMA0QgVUQAVUoLHA4DLx5QJ3B+L7PcxEe6HDT1/m3NECwRtgDZfhItjB/SNpPOJSDOzK5ynPpN4yPdzkcZhEFn08F4EzjAKsxBgux1/sBu6gw6GT1SB+e84Cd+V6LgtHY8CVPDPaihluYj1hkZen31nhwWTAjiHPQSlMxFDRJOc7SLlnxwQC6Puvw+ETlBjX0cVULlZT4SwRRAIQ5OfhK1QPjBjIghN01WAQMg23KhHAdP+cqXodaIKSI7sTlwxCB7hBIgAV/fJMYT1vxVUdE0hiLUlAF4wiAfThxwMsCslUTWQg1c2nVMYnSGERCaDjT58j9Sg1EXy5cE0jJWMTepckAuTDCmuj2ZoImMmmI9060i1OIsCN0VFUbiL2EH3iMjnnunIhFJgsM23jqTaxQA8Z0wsFkgXId09dzhbAFkiICUKBLbFTNbwY3a0uZR2Y6MHLmkEo4CmjtBV9oceMmaL9l1kiwB7zk0M9M9uakX9KosssMCcQAI+5Rylxv20MxylUvuOjJhUY66aYqYmmI1dzjNXbokrjPwKS1/3k5+p9/1b/tqiACqjA+xNodZzT/ECq+ZFa60PB5seaiqIoiqK8Iv4CS79siHvGtFUAAAAASUVORK5CYII="
          alt=""
        />
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAflBMVEUAAADy8/Xy8/Xy8/Xy8/Xy8/UAUJi1yt72pQB5ocYdZKM8eK8OWp3E1OPU3+nj6e9ajbumwNiXttItbqlLgrWIq8xpl8DzuUD2sijy7ubz6db01JEPVY7vpQvz37jz26i/uJQuYHv0zHpNa2j1wluKhVGrkT+giTrElyrUnSDuLh2LAAAABXRSTlMA8KAgMC4oWXgAAAIfSURBVGje7ZjZcuMgEEXHTgAjIdBiy1lnX///BwfTi6h5mU6VqUoqfV4ssOjb3G5ZLj4oiqIoivKauNnvzFXZ7W/q+LcQ/roSt1X+EP/aCtse9qYJexbYmSbsWMA0QgVUQAVUoLHA4DLx5QJ3B+L7PcxEe6HDT1/m3NECwRtgDZfhItjB/SNpPOJSDOzK5ynPpN4yPdzkcZhEFn08F4EzjAKsxBgux1/sBu6gw6GT1SB+e84Cd+V6LgtHY8CVPDPaihluYj1hkZen31nhwWTAjiHPQSlMxFDRJOc7SLlnxwQC6Puvw+ETlBjX0cVULlZT4SwRRAIQ5OfhK1QPjBjIghN01WAQMg23KhHAdP+cqXodaIKSI7sTlwxCB7hBIgAV/fJMYT1vxVUdE0hiLUlAF4wiAfThxwMsCslUTWQg1c2nVMYnSGERCaDjT58j9Sg1EXy5cE0jJWMTepckAuTDCmuj2ZoImMmmI9060i1OIsCN0VFUbiL2EH3iMjnnunIhFJgsM23jqTaxQA8Z0wsFkgXId09dzhbAFkiICUKBLbFTNbwY3a0uZR2Y6MHLmkEo4CmjtBV9oceMmaL9l1kiwB7zk0M9M9uakX9KosssMCcQAI+5Rylxv20MxylUvuOjJhUY66aYqYmmI1dzjNXbokrjPwKS1/3k5+p9/1b/tqiACqjA+xNodZzT/ECq+ZFa60PB5seaiqIoiqK8Iv4CS79siHvGtFUAAAAASUVORK5CYII="
          alt=""
        />
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAflBMVEUAAADy8/Xy8/Xy8/Xy8/Xy8/UAUJi1yt72pQB5ocYdZKM8eK8OWp3E1OPU3+nj6e9ajbumwNiXttItbqlLgrWIq8xpl8DzuUD2sijy7ubz6db01JEPVY7vpQvz37jz26i/uJQuYHv0zHpNa2j1wluKhVGrkT+giTrElyrUnSDuLh2LAAAABXRSTlMA8KAgMC4oWXgAAAIfSURBVGje7ZjZcuMgEEXHTgAjIdBiy1lnX///BwfTi6h5mU6VqUoqfV4ssOjb3G5ZLj4oiqIoivKauNnvzFXZ7W/q+LcQ/roSt1X+EP/aCtse9qYJexbYmSbsWMA0QgVUQAVUoLHA4DLx5QJ3B+L7PcxEe6HDT1/m3NECwRtgDZfhItjB/SNpPOJSDOzK5ynPpN4yPdzkcZhEFn08F4EzjAKsxBgux1/sBu6gw6GT1SB+e84Cd+V6LgtHY8CVPDPaihluYj1hkZen31nhwWTAjiHPQSlMxFDRJOc7SLlnxwQC6Puvw+ETlBjX0cVULlZT4SwRRAIQ5OfhK1QPjBjIghN01WAQMg23KhHAdP+cqXodaIKSI7sTlwxCB7hBIgAV/fJMYT1vxVUdE0hiLUlAF4wiAfThxwMsCslUTWQg1c2nVMYnSGERCaDjT58j9Sg1EXy5cE0jJWMTepckAuTDCmuj2ZoImMmmI9060i1OIsCN0VFUbiL2EH3iMjnnunIhFJgsM23jqTaxQA8Z0wsFkgXId09dzhbAFkiICUKBLbFTNbwY3a0uZR2Y6MHLmkEo4CmjtBV9oceMmaL9l1kiwB7zk0M9M9uakX9KosssMCcQAI+5Rylxv20MxylUvuOjJhUY66aYqYmmI1dzjNXbokrjPwKS1/3k5+p9/1b/tqiACqjA+xNodZzT/ECq+ZFa60PB5seaiqIoiqK8Iv4CS79siHvGtFUAAAAASUVORK5CYII="
          alt=""
        />
      </div>
    )
  }

  const CardDetails = ({}) => {
    return (
      <>
        <p className="primary-text">Card Details</p>
        <AcceptedCards />
        <div className="">
          <span className="text-light">Name on card</span>
          <input className="w-full rounded-lg border bg-transparent p-2 text-light" type="text" />
        </div>
        <div className="">
          <span className="text-light">Card Number</span>
          <input className="w-full rounded-lg border bg-transparent p-2 text-light" type="text" />
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="">
            <span className="text-light">Expiration</span>
            <input className="w-full rounded-lg border bg-transparent p-2 text-light" type="text" />
          </div>
          <div className="">
            <span className="text-light">CVV</span>
            <input className="w-full rounded-lg border bg-transparent p-2 text-light" type="text" />
          </div>
        </div>

        <div className="flex items-start gap-x-2">
          <input className="mt-2 border border-red-500" type="checkbox" name="" id="" />
          <p className="text-light">
            Tick here to confirm that you are at least 18 years old and the age of majority in your place of residence
          </p>
        </div>
      </>
    )
  }

  const BillingDetails = () => {
    return (
      <>
        <div className="">
          <span className="text-light">State / Province</span>
          <input className="w-full rounded-lg border bg-transparent p-2 text-light" type="text" />
        </div>
        <div className="">
          <span className="text-light">Address</span>
          <input className="w-full rounded-lg border bg-transparent p-2 text-light" type="text" />
        </div>
        <div className="">
          <span className="text-light">City</span>
          <input className="w-full rounded-lg border bg-transparent p-2 text-light" type="text" />
        </div>
        <div className="">
          <span className="text-light">ZIP / Postal Code</span>
          <input className="w-full rounded-lg border bg-transparent p-2 text-light" type="text" />
        </div>
      </>
    )
  }

  return (
    <div className=" space-y-2.5 border px-2 py-2">
      <div className="flex w-full justify-between">
        <p className="text-light">Add Card</p>
        <div className="flex gap-x-2">
          {open ? (
            <a
              className="flex cursor-pointer items-center gap-x-2 font-semibold text-light"
              onClick={() => setOpen(!open)}
            >
              Hide <ChevronUp size={18} />
            </a>
          ) : (
            <a
              className="flex cursor-pointer items-center gap-x-2 font-semibold text-light"
              onClick={() => setOpen(!open)}
            >
              Show <ChevronDown size={18} />
            </a>
          )}
        </div>
      </div>
      {open && (
        <>
          <BillingDetails />
          <CardDetails />
        </>
      )}
    </div>
  )
}

const WalletView = ({ credits, orders }: { credits: number; orders: order[] }) => {
  const [transactionsExpanded, setTransactionsExpanded] = useState(true)
  return (
    <div className="mx-auto h-screen max-w-xl">
      <WalletActionsButton credits={credits as number} />
      <hr className="  mt-4 border-white/10" />
      {/* <CardForm /> */}
      {orders.length > 0 ? (
        <div className="">
          <OrdersHeader setTransactionsExpanded={setTransactionsExpanded} transactionsExpanded={transactionsExpanded} />
          <UserOrders transactionsExpanded={transactionsExpanded} orders={orders} />
        </div>
      ) : (
        <EmptyState description="No transactions yet" />
      )}
    </div>
  )
}

export function Wallet() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [credits, setCredits] = useState<null | number>(null)

  const { username } = useChatContextParams()

  const getUserCredits = async () => {
    const _id = localStorage.getItem('_id')
    const balanceRequest = await fetch(`http://192.168.100.16:3000/users/credits?_id=${_id}`)
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
    return <Loader />
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
