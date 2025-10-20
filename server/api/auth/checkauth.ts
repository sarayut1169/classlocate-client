// api/class/checkin.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
//   console.log("BODYDATA CHECK AUTH:", body)


  const {accessToken } = body
  const url = `https://localhost:7021/api/user/secure-data/`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
  })

  const data = await response.json()

  return data
})