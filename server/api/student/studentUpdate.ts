
// api/student/studentUpdate.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY STUDENT:",body);
  
 const { id, studentName, studentId, major, accessToken } = body



  if (!id || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url = `https://localhost:7021/api/studentdata/update-studentdata/`

const response = await fetch(url, {
  method: 'PUT',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json', // ✅ ต้องมี
    'Authorization': `Bearer ${accessToken}`,
  },
  body: JSON.stringify({
    id: id,
    studentName: studentName,     // ✅ แก้ชื่อให้ถูกต้อง
    studentId: studentId,
    major: major,
  }),
  credentials: 'include',
})

  const data = await response.json()
  console.log("DATA STUDENT INFO: ",data);
  
  return data
})