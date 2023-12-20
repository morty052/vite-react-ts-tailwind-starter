import { Clerk } from '@clerk/clerk-sdk-node'

const clerkClient = Clerk({
  secretKey: 'sk_test_B0Js4tznBzLCdLQO24J23D1LC9kfXwyum6j5HLvJEQ',
})

export async function updateAuthUsername(username, user_id) {
  //   const clientList = await clerkClient.users.getUserList()
  try {
    const user = await clerkClient.users.updateUser(user_id, { username })
    return user
  } catch (error) {
    console.error(error)
  }
}

// user_2ZfynyBFVULavgT1qeYYFn2mRIp
