import { StreamChat } from 'stream-chat'

const appKEY = '4tfg8w9fwvvu'
const secret = '2z7ymduacx5nc57av3uw8mw4ep5u4xx9bdrqhrt69uw7n4qhcxqbmzxs63fk5v4z'
const chatClient = new StreamChat(appKEY, secret)

export const generateChatToken = (user_id) => {
  const token = chatClient.createToken(user_id)
  return token
}

export const createUser = (bunny_name) => {
  const token = chatClient.upsertUser({ id: bunny_name, name: bunny_name })
  return token
}
