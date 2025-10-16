// api/registerstudent.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA CREATE LEAVE:", body)


  const {  email, password, telNo ,teacherinfo} = body
  const url = `https://localhost:7021/api/user/register-teacher/`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      telNo,
      teacherInfo : teacherinfo
    }),
    credentials: 'include',
  })

  const data = await response.json()
  console.log("DATA LEAVE:", data)

  return data
})