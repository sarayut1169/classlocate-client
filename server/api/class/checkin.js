// api/class/checkin.ts
import {BASE_API_URL } from '../util/httputil.js'


export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA CREATE CHECKIN:", body)


  const { studentId, subjectInfoId, location, accessToken } = body
  const url =BASE_API_URL + `/api/checkin/create-checkin/`

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


  return response
})