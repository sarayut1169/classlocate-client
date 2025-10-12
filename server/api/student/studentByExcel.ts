// api/student/studentByExcel.ts
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
  
  const url = `https://localhost:7021/api/studentdata/import-studentdata/${subjectId}`
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

  const data = await response.json()
  console.log("DATA STUDENT CREATE:", data)

  return data
})

