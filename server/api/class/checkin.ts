// api/class/checkin.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA CREATE CHECKIN:", body)


  const { studentId, subjectInfoId, location, accessToken } = body
  const url = `https://localhost:7021/api/checkin/create-checkin/`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      studentId,
      subjectInfoId,
      location:{
        latitude: location.latitude,
        longitude: location.longitude
      }
    }),
    credentials: 'include',
  })

  const data = await response.json()
  console.log("DATA:", data)

  return data
})