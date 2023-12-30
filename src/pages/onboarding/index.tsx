import { useSignUp, useUser } from '@clerk/clerk-react'
import { MailOpen } from 'lucide-react'
import { useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import bg from '../../assets/bg.jpg'

async function createNewUser(email: string, username: string) {
  const res = await fetch(`http://192.168.100.16:3000/users/create?email=${email}&username=${username}`)
  const data = await res.json()
  const { error, _id } = data

  if (!error) {
    console.log('user created')
    return _id
  } else console.error('something went wrong')
}

const SignUpForm = ({ setSigningUp }) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const { isLoaded, signUp, setActive } = useSignUp()

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
            className="mt-2 w-full rounded-lg border bg-transparent p-3.5 text-light focus:outline-none  "
            placeholder="Email"
            type="text"
          />
        </div>
        <div className="">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border bg-transparent p-3.5 text-light focus:outline-none  "
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
        <Button
          disabled={!emailAddress || !password}
          onClick={(e) => submit(e)}
          className="bg-fuchsia-500"
          size={'hero'}
        >
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
    <div className="mx-auto flex max-w-sm flex-col gap-y-4 py-14 ">
      <div className="mx-auto max-w-xs">
        <MailOpen color="white" size={120} />
      </div>
      <p className="primary-text text-center">Please Verify Your Email</p>
      <p className=" text-sm text-light">
        To continue creating your account please enter the one time code we sent to your email something@mail.com{' '}
      </p>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        type="text"
        className="rounded-lg border bg-transparent p-3.5 text-center text-lg font-semibold text-light"
      />
      <Button className="bg-fuchsia-500 hover:bg-fuchsia-600" onClick={verifyOtp}>
        Confirm
      </Button>
      <div className="">
        <p className="text-center  text-light">
          Didn&apos;t get the code ? <span className="cursor-pointer text-blue-700">click here to resend</span>
          <p className="mt-1 text-blue-700">Change email</p>
        </p>
      </div>
    </div>
  )
}

const CreateUsername = () => {
  const [username, setUsername] = useState('')

  const { isLoaded, user } = useUser()

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

    const _id = await createNewUser(email as string, username)
    console.log(_id)
    localStorage.setItem('_id', _id)
    window.location.replace(`/dashboard`)
  }

  return (
    <div className="grid  md:grid-cols-2">
      <div className="relative mx-auto hidden w-full flex-col  gap-y-4 border text-center md:flex">
        <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }} className="absolute inset-0"></div>
      </div>
      <div className="mx-auto flex h-screen w-full max-w-md flex-col gap-y-4 px-2 pt-20 text-center md:justify-center md:pb-48 md:pt-0">
        <div className="">
          <p className="primary-text">Create a username</p>
          <p className="text-sm text-light">Finish setting up your account by creating a username</p>
        </div>
        <div className=" w-full pt-2.5">
          <input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="w-full rounded-md border bg-transparent p-2 text-center text-light"
          />
          <p className="mt-1 text-left text-xs text-gray-100">Your username will be visible to others</p>
        </div>
        <Button className="bg-fuchsia-500 hover:bg-fuchsia-600" onClick={() => updateUsername(id as string, username)}>
          Confirm
        </Button>
      </div>
    </div>
  )
}

export function OnboardingForm() {
  const [username, setUsername] = useState('')
  const [pendingVerification, setpendingVerification] = useState(false)
  const [otp, setOtp] = useState('')
  const [signingUp, setsigningUp] = useState(true)

  const { isLoaded, signUp, setActive } = useSignUp()

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
