// api/student/studentByExcel.ts
import {BASE_API_URL } from '../util/httputil.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA CREATE STUDENT EXCEL:", body)


 const { subjectId,excelFile, accessToken } = body

  if (!accessToken) {
    return { error: 'Missing required fields' }
  }

  const formData = new FormData()
  formData.append('file', excelFile.value)
  console.log("FORMDATA:", formData);
  
  const url = BASE_API_URL + `/api/studentdata/import-studentdata/${subjectId}`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
    credentials: 'include',
  })



  return response
})

