// api/class/checkin.ts
import {BASE_API_URL } from '../util/httputil.js'


export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA CREATE LEAVE:", body)


  const { studentId, subjectInfoId, description, accessToken } = body
  const url = BASE_API_URL + `/api/checkin/create-leave/`

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



  return response
})