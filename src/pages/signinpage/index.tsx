import { SignIn, useUser, SignedOut, SignedIn } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const NavigateToDashBoard = () => {
  const [loading, setLoading] = useState(true)
  const [id, setid] = useState(null)
  const { user } = useUser()
  const username = user?.username
  const navigate = useNavigate()

  const getUserid = async () => {
    const res = await fetch(`http://192.168.100.16:3000/users/get-userid?username=${username}`)
    const data = await res.json()
    const { _id } = data
    setid(_id)
    localStorage.setItem('_id', _id)
    setLoading(false)
    // navigate(`/dashboard/?_id=${_id}`)
  }

  useEffect(() => {
    if (!username) {
      return
    }

    getUserid()
  }, [username])

  if (loading) {
    return null
  }

  return <Navigate to={`/dashboard/?_id=${id}`} />
}

export function SignInPage() {
  return (
    <>
      <SignedOut>
        <SignIn redirectUrl={'/dashboard'} />
      </SignedOut>
      <SignedIn>
        <NavigateToDashBoard />
      </SignedIn>
    </>
  )
}
