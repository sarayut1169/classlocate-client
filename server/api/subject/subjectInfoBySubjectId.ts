
// api/subject/subjectInfoBySubjectId.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:",body);
  
  const subjectId= body.subjectId
  const accessToken = body.accessToken

  if (!subjectId || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url = `https://localhost:7021/api/subjectInfo/get-SubjectInfoBySubjectId/${subjectId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  const data = await response.json()
  console.log("DATA SUBJECT INFO: ",data);
  
  return data
})