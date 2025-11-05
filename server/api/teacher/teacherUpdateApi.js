// api/teacherUpdateApi.js

import {BASE_API_URL } from '../../api/util/httputil.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:", body)

  const { userId, accessToken, updatedData } = body

  if (!userId || !accessToken || !updatedData) {
    return { error: 'Missing required fields' }
  }

  const url =BASE_API_URL+`/api/teacher/update-teacher-info`

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      userId: userId,
      name: updatedData.name,
      major: updatedData.major,
      position: updatedData.position,
      history: updatedData.history,
    }),
    credentials: 'include',
  })

  return response
})