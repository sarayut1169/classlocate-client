// api/student/studentCreate.ts
import {BASE_API_URL } from '../util/httputil.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA CREATE STUDENT:", body)


 const { studentName, studentId, major, subjectId, accessToken } = body

  if (!accessToken) {
    return { error: 'Missing required fields' }
  }

  const url = BASE_API_URL + `/api/studentdata/create-studentdata/`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({

      subjectId: subjectId,
      studentDataInput: [
        {
        studentName: studentName,
        studentId: studentId,
        major: major
        }
      ]
    }),
    credentials: 'include',
  })



  return response
})