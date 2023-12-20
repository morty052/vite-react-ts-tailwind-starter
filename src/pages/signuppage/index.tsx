export function SignUpPage() {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [pendingVerification, setpendingVerification] = useState(false)
  const [otp, setOtp] = useState('')
  const [onboarding, setOnboarding] = useState(false)

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
        username,
      })
      await signUp?.prepareEmailAddressVerification({
        strategy: 'email_code',
      })
      setpendingVerification(true)
    } catch (err) {
      console.error('error', err.errors[0].longMessage)
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

  return (
    <div className="">
      {!pendingVerification && (
        <div className="flex flex-col gap-y-4">
          <input className="border" value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
          <input
            className="border"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            type="text"
          />
          <input className="border" value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
          <Button onClick={(e) => submit(e)}>Submit</Button>
        </div>
      )}
      {pendingVerification && (
        <div className="flex flex-col gap-y-4">
          <input className="border bg-transparent" value={otp} onChange={(e) => setOtp(e.target.value)} type="text" />
          <p className="primary-text text-center">Check your email</p>
          <Button onClick={() => verifyOtp()}>Confirm</Button>
        </div>
      )}
    </div>
  )
}
