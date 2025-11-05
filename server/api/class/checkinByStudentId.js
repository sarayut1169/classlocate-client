// api/subject/subjectById.ts
import {BASE_API_URL } from '../util/httputil.js'


export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:",body);
  
  const subjectInfoId = body.subjectInfoId
  const studentId = body.studentId
  const accessToken = body.accessToken

  if (!subjectInfoId || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url = BASE_API_URL + `/api/checkin/get-checkin-by-studentid/${subjectInfoId}/${studentId}`

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