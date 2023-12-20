import { useSignUp, useUser, useClerk } from '@clerk/clerk-react'
import { useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

async function createNewUser(email: string, username: string) {
  const res = await fetch(`http://192.168.100.16:3000/users/create?email=${email}&username=${username}`)
  const data = await res.json()
  const { error } = data

  if (!error) {
    console.log('user created')
  } else console.error('something went wrong')
}

const SignUpForm = ({ setSigningUp }) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const { isLoaded, signUp, setActive } = useSignUp()

  if (!isLoaded) {
    // handle loading state
    return null
  }

  async function submit(e) {
    e.preventDefault()
    // Check the sign up response to
    // decide what to do next.

    try {
      await signUp.create({
        emailAddress,
        password,
      })
      await signUp?.prepareEmailAddressVerification({
        strategy: 'email_code',
      })
      //   setpendingVerification(true)
      window.location.replace('/onboarding')
    } catch (err) {
      console.error('error', err)
    }

    // await createNewUser(emailAddress, username)
  }
  return (
    <div className="space-y-4 px-2  pb-8 pt-4 sm:pt-20">
      <div className="mx-auto max-w-md space-y-6">
        <div className="">
          <span className=" text-light ">Create Account</span>
          <input
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="mt-2 w-full rounded-lg border bg-transparent p-3.5 focus:outline-none  "
            placeholder="Email"
            type="text"
          />
        </div>
        <div className="">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border bg-transparent p-3.5 focus:outline-none  "
            placeholder="Password"
            type="text"
            name=""
            id=""
          />
          <div className="flex justify-between pt-2">
            <p className="text-sm text-light">Forgot password?</p>
            <a
              onClick={() => setSigningUp(false)}
              className="group flex cursor-pointer gap-x-1 text-sm text-light  hover:text-fuchsia-500"
            >
              <p>Log in instead</p>
              <span className=" transition-all duration-200 ease-in group-hover:translate-x-1">&#8594;</span>
            </a>
          </div>
        </div>
        <Button onClick={(e) => submit(e)} className="bg-fuchsia-500" size={'hero'}>
          Create Account
        </Button>
      </div>
    </div>
  )
}

const SignInForm = ({ setSigningUp }) => {
  return (
    <div className="space-y-4 px-2  pb-8 pt-4 sm:pt-20">
      <div className="mx-auto max-w-md space-y-6">
        <div className="">
          <span className=" text-light ">Log in </span>
          <input
            className="mt-2 w-full rounded-lg border bg-transparent p-3.5 focus:outline-none  "
            placeholder="Email"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="">
          <input
            className="w-full rounded-lg border bg-transparent p-3.5 focus:outline-none  "
            placeholder="Password"
            type="text"
            name=""
            id=""
          />
          <div className="flex justify-between pt-2">
            <p className="text-sm text-light">Forgot password?</p>
            <a
              onClick={() => setSigningUp(true)}
              className="group flex cursor-pointer gap-x-1 text-sm text-light  hover:text-fuchsia-500"
            >
              <p>Sign up</p>
              <span className=" transition-all duration-200 ease-in group-hover:translate-x-1">&#8594;</span>
            </a>
          </div>
        </div>
        <Button className="bg-fuchsia-500" size={'hero'}>
          Login
        </Button>
        <Button onClick={() => setSigningUp(true)} className="" size={'hero'}>
          Create Account
        </Button>
      </div>
    </div>
  )
}

const OtpVerification = () => {
  const [code, setCode] = useState('')
  const { isLoaded, signUp, setActive } = useSignUp()

  if (!isLoaded) {
    return null
  }

  async function verifyOtp() {
    try {
      const result = await signUp?.attemptVerification({
        strategy: 'email_code',
        code,
      })
      console.log('verified')
      // setActive({ session: })
      console.log(result)
      setActive({ session: result?.createdSessionId })
      window.location.replace(`/onboarding/${result?.createdUserId}`)
    } catch (err) {
      console.error('error', err)
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-y-4 py-10 text-center">
      <p className="primary-text">Please Check your email</p>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        type="text"
        className="border bg-transparent text-center text-light"
      />
      <Button onClick={verifyOtp}>Confirm</Button>
    </div>
  )
}

const CreateUsername = () => {
  const [username, setUsername] = useState('')

  const { isLoaded, user } = useUser()
  const { signOut } = useClerk()

  const id = useParams().id

  const email = user?.emailAddresses[0]?.emailAddress

  if (!isLoaded) {
    return null
  }

  /**
   * Asynchronously updates the username for a user on clerk.
   * Calls the createNewUser function with the email and username
   *
   * @param {string} id - The ID of the user.
   * @param {string} username - The new username.
   * @return {Promise<void>} - A promise that resolves once the username has been updated.
   */
  async function updateUsername(id: string, username: string) {
    const res = await fetch(`http://192.168.100.16:3000/users/update-username?username=${username}&user_id=${id}`)
    const data = await res.json()
    const { error } = data

    if (!error) {
      console.log('user created')
    } else console.error('something went wrong')

    await createNewUser(email as string, username)
    window.location.replace(`/dashboard`)
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-y-4 py-10 text-center">
      <p className="primary-text">Create a username for your account</p>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        className="border bg-transparent text-center text-light"
      />
      <Button onClick={() => updateUsername(id as string, username)}>Confirm</Button>
      <Button onClick={() => signOut(() => window.location.assign('/'))}>Sign out</Button>
    </div>
  )
}

export function OnboardingForm() {
  const [username, setUsername] = useState('')
  const [pendingVerification, setpendingVerification] = useState(false)
  const [otp, setOtp] = useState('')
  const [signingUp, setsigningUp] = useState(true)

  const { isLoaded, signUp, setActive } = useSignUp()

  if (!isLoaded) {
    // handle loading state
    return null
  }

  async function submit(e) {
    e.preventDefault()
    // Check the sign up response to
    // decide what to do next.

    try {
      await signUp.create({
        emailAddress,
        password,
      })
      await signUp?.prepareEmailAddressVerification({
        strategy: 'email_code',
      })
      setpendingVerification(true)
    } catch (err) {
      console.error('error', err)
    }

    // await createNewUser(emailAddress, username)
  }

  async function verifyOtp() {
    try {
      const result = await signUp?.attemptVerification({
        strategy: 'email_code',
        code: otp,
      })
      console.log('verified')
      // setActive({ session: })
      console.log(result?.createdUserId)
      setActive({ session: result?.createdSessionId })
      window.location.replace(`/onboarding/${result?.createdUserId}`)
    } catch (err) {
      console.error('error', err.errors[0].longMessage)
    }
  }

  return <>{!signingUp ? <SignInForm setSigningUp={setsigningUp} /> : <SignUpForm setSigningUp={setsigningUp} />} </>
}
export function Onboarding() {
  return (
    <Routes>
      <Route path="/" element={<OtpVerification />} />
      <Route path="/:id" element={<CreateUsername />} />
    </Routes>
  )
}
