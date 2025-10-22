// api/teacherDataApi.js
// api/teacherDataApi.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:",body);
  
  const teacherId = body.teacherId
  const accessToken = body.accessToken

  if (!teacherId || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url = `https://localhost:7021/api/subject/get-all-by-teacher-id/${teacherId}`

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