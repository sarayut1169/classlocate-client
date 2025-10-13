// api/subject/subjectByStudentId.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:",body);
  
  const studentId = body.studentId
  const accessToken = body.accessToken

  if (!studentId || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url = `https://localhost:7021/api/subject/get-all-by-student-id/${studentId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  const data = await response.json()
  console.log("DATA:",data);
  
  return data
})