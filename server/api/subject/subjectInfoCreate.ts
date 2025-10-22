
// api/subject/subjectInfoUpdate.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODY CREATE SUBJECT INFO:",body);
  
 const { subjectId, day, leranStartTime, leranEndTime, startCheckIn,endCheckIn, accessToken } = body



  if (!subjectId || !accessToken) {
    return { error: 'Missing userId or accessToken' }
  }

  const url = `https://localhost:7021/api/subjectInfo/create-SubjectInfo/`

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json', // ✅ ต้องมี
    'Authorization': `Bearer ${accessToken}`,
  },
  body: JSON.stringify({
    subjectId: subjectId,
    day: parseInt(day),
    leranStartTime: leranStartTime,     // ✅ แก้ชื่อให้ถูกต้อง
    leranEndTime: leranEndTime,
    startCheckIn: startCheckIn,
    endCheckIn: endCheckIn
  }),
  credentials: 'include',
})

  return response
})