// api/teacherDataApi.js
// api/teacherDataApi.js

import {BASE_API_URL } from '../../api/util/httputil.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:",body);
  
  const userId = body.userId
  const accessToken = body.accessToken

  if (!userId || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url = BASE_API_URL + `/api/teacher/get-teacher-info/${userId}`

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