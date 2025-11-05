// api/teacherDataApi.js
// api/teacherDataApi.js
import {BASE_API_URL } from '../util/httputil.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:",body);
  
  const teacherId = body.teacherId
  const accessToken = body.accessToken

  if (!teacherId || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url = BASE_API_URL + `/api/subject/get-all-by-teacher-id/${teacherId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  
  return response
})