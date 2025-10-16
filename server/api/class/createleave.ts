// api/class/checkin.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA CREATE LEAVE:", body)


  const { studentId, subjectInfoId, description, accessToken } = body
  const url = `https://localhost:7021/api/checkin/create-leave/`

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
      description,
    }),
    credentials: 'include',
  })

  const data = await response.json()
  console.log("DATA LEAVE:", data)

  return data
})