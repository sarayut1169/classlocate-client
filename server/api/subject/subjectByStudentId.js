// api/subject/subjectByStudentId.ts
import {BASE_API_URL } from '../util/httputil.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:",body);
  
  const studentId = body.studentId
  const accessToken = body.accessToken

  if (!studentId || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url =BASE_API_URL + `/api/subject/get-all-by-student-id/${studentId}`

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