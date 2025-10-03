
// api/subject/subjectInfoUpdate.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY:",body);
  
 const { id, leranStartTime, leranEndTime, startCheckIn,endCheckIn, accessToken } = body



  if (!id || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url = `https://localhost:7021/api/subjectInfo/update-SubjectInfo/`

const response = await fetch(url, {
  method: 'PUT',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json', // ✅ ต้องมี
    'Authorization': `Bearer ${accessToken}`,
  },
  body: JSON.stringify({
    id: id,
    leranStartTime: leranStartTime,     // ✅ แก้ชื่อให้ถูกต้อง
    leranEndTime: leranEndTime,
    startCheckIn: startCheckIn,
    endCheckIn: endCheckIn
  }),
  credentials: 'include',
})

  const data = await response.json()
  console.log("DATA SUBJECT INFO: ",data);
  
  return data
})