// api/teacherUpdateApi.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:", body)

  const { userId, accessToken, updatedData } = body

  if (!userId || !accessToken || !updatedData) {
    return { error: 'Missing required fields' }
  }

  const url = `https://localhost:7021/api/teacher/update-teacher-info`

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      UserId: userId,
      Name: updatedData.name,
      Major: updatedData.major,
      Position: updatedData.position,
      History: updatedData.history,
    }),
    credentials: 'include',
  })

  const data = await response.json()
  console.log("DATA:", data)

  return data
})