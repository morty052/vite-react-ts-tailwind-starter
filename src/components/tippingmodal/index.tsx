import { useMemo, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { CheckCircleIcon } from 'lucide-react'
import { Dialog, DialogContent } from '../ui/dialog'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const getUserCredits = async () => {
  const _id = localStorage.getItem('_id')
  const balanceRequest = await fetch(`http://192.168.100.16:3000/users/credits?_id=${_id}`)
  const balanceData = await balanceRequest.json()
  const { credits } = balanceData
  return credits
}

function TippingVisuals({
  avatar,
  tip,
  credits,
  isLoading,
  insufficientBalance,
}: {
  avatar: string
  tip: number
  credits: number
  isLoading: boolean
  insufficientBalance: boolean
}) {
  const [balance, setBalance] = useState(tip)
  const CreditSkeleton = () => {
    return <Skeleton className="flex h-10 w-20   p-1" />
  }
  useMemo(() => setBalance(credits - tip), [tip, credits])
  const formattedCredit = balance?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="flex  items-center justify-center gap-x-2 ">
          <img className="h-14 w-14 rounded-full object-cover" src={avatar} alt="" />
          <div className="">
            <p>Bobby</p>
            <p className="text-xs">@bobbylee</p>
          </div>
        </div>
        <div className="flex ">
          {!insufficientBalance && <p className="text-2xl">{isLoading ? <CreditSkeleton /> : formattedCredit}</p>}
          {insufficientBalance && <p className="text-2xl">{'Insufficient credits'}</p>}
        </div>
      </div>
    </>
  )
}

function QuickTipTab({ amount, setPurchaseAmount }: { amount: number; setPurchaseAmount: any }) {
  return (
    <button
      onClick={() => setPurchaseAmount(amount)}
      className="flex h-10 w-20 items-center justify-center rounded-xl border bg-fuchsia-500 p-1"
    >
      <p className="text-sm font-semibold">{amount}</p>
    </button>
  )
}

function QuickTipsContainer({ setPurchaseAmount }: { setPurchaseAmount: any }) {
  const allTips = [50, 100, 500, 1000]
  return (
    <div className="">
      <p className="font-medium">Quick tip:</p>
      <div className="flex flex-wrap  gap-1">
        {allTips.map((tip, index) => (
          <QuickTipTab setPurchaseAmount={setPurchaseAmount} key={index} amount={tip} />
        ))}
      </div>
    </div>
  )
}

function CurrencyInput({ value, handleTipValue }: any) {
  return (
    <input
      value={value}
      onChange={(e) => handleTipValue(e.target.value)}
      placeholder="Enter custom amount"
      className="w-full rounded border p-2 text-center "
      type="text"
    />
  )
}

const TipConfirmation = (props: any) => {
  const { tip, setTip, avatar, confirmTip, insufficientBalance, setInsufficientBalance, loading } = props

  const { isLoading, data: credits, error } = useQuery({ queryKey: ['_id'], queryFn: getUserCredits })

  function handleTipValue(e: any) {
    if (insufficientBalance) {
      setInsufficientBalance(false)
    }

    if (isNaN(Number(e))) {
      return
    }

    if (credits - Number(e) < 0) {
      setInsufficientBalance(true)
    }

    setTip(e)
  }

  //   TODO: ADD OR REMOVE TIP BUNNY DIRECTLY STUFF
  function TipConfirMationButton() {
    return (
      <div className=" space-y-2">
        {!insufficientBalance ? (
          <Button disabled={insufficientBalance || !tip} className="w-full max-w-md" onClick={confirmTip} size={'lg'}>
            <span>{loading ? 'Confirming...' : 'Confirm tip'}</span>
          </Button>
        ) : (
          <Link to={'/dashboard/wallet/packages'}>
            <Button className="w-full max-w-md" size={'lg'}>
              <span>Add Tip</span>
            </Button>
          </Link>
        )}
        {/* <p className="text-center text-sm font-medium text-blue-700">Tip bunny directly.</p> */}
      </div>
    )
  }

  return (
    <div className="px-2 sm:px-0">
      <div className="flex flex-col items-center space-y-4 rounded-lg  bg-white p-4">
        <div className="w-full max-w-sm  space-y-6 ">
          {/* <UserBalance tip={tip} /> */}
          <TippingVisuals
            insufficientBalance={insufficientBalance}
            isLoading={isLoading}
            tip={tip}
            credits={credits}
            avatar={avatar}
          />
          <div className="mx-auto w-full space-y-4">
            <QuickTipsContainer setPurchaseAmount={setTip} />
            <CurrencyInput value={tip} handleTipValue={handleTipValue} />
            <TipConfirMationButton />
          </div>
        </div>
      </div>
    </div>
  )
}

const TipConfirmedModal = (props: any) => {
  return (
    <div className="px-2 sm:px-0">
      <div className="flex flex-col items-center space-y-4 rounded-lg  bg-white p-4">
        <CheckCircleIcon size={100} color="green" />
        <p className="text-2xl font-semibold">Tip sent!</p>
      </div>
    </div>
  )
}

export function TippingModal({ open, setOpen, eventName, avatar }: any) {
  const [tip, setTip] = useState('')
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const checkBalance = async (purchaseAmount: number) => {
    const _id = localStorage.getItem('_id')
    const balanceRequest = await fetch(`http://192.168.100.16:3000/users/credits?_id=${_id}`)
    const balanceData = await balanceRequest.json()
    const { credits } = balanceData
    if (credits >= purchaseAmount) {
      console.log('user has enough credits')
      return true
    } else {
      console.log('user has insufficient credits')
      return false
    }
  }

  async function confirmTip() {
    if (insufficientBalance) {
      return
    }
    setLoading(true)
    const canAfford = await checkBalance(Number(tip))
    if (!canAfford) {
      setLoading(false)
      return
    }

    setLoading(false)
    setOpen(false)
    toast.success('Your Tip has been sent!.')
    // setSuccess(true)
  }

  const handleClose = () => {
    setOpen(false)
    setInsufficientBalance(false)
    setTip('')
    setLoading(false)
    setSuccess(false)
  }

  const PurchaseCredits = () => {
    return (
      <div className="mt-4  px-2">
        <div className="flex justify-center space-y-4 rounded-lg bg-white p-6">
          <div className="space-y-4 text-center">
            <p className=" first-letter:uppercase">Purchase more credits to book Tip</p>
          </div>
        </div>
      </div>
    )
  }

  const tipModalContentProps = {
    eventName,
    tip,
    setTip,
    avatar,
    insufficientBalance,
    setInsufficientBalance,
    confirmTip,
    loading,
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        {!success ? <TipConfirmation {...tipModalContentProps} /> : <TipConfirmedModal {...tipModalContentProps} />}
      </DialogContent>
    </Dialog>
  )
}
