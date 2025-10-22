// api/subject/subjectById.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:",body);
  
  const subjectInfoId = body.subjectInfoId
  const accessToken = body.accessToken

  if (!subjectInfoId || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url = `https://localhost:7021/api/checkin/get-checkin/${subjectInfoId}`

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