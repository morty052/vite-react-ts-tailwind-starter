export const likeBunny = async (username: string, bunny_id: string) => {
  const res = await fetch(`http://192.168.100.16:3000/users/likebunny?username=${username}&bunny_id=${bunny_id}`)
  const data = await res.json()
  console.log(data)
}
