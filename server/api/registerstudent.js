// api/registerstudent.ts
import {BASE_API_URL } from './util/httputil.js'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA CREATE LEAVE:", body)


  const {  email, password, telNo ,studentInfo} = body
  const url = BASE_API_URL + `/api/user/register-student/`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      telNo,
      studentInfo
    }),
    credentials: 'include',
  })

  const data = await response.json()
  console.log("DATA LEAVE:", data)

  return data
})