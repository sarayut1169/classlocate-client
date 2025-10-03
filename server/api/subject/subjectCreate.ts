// api/subject/subjectCreate.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA CREATE SUBJECT:", body)


 const { name, teacherId, subjectCode, location, accessToken } = body

  if (!accessToken) {
    return { error: 'Missing required fields' }
  }
    const arr = location;
    const parsedLocation = {
      locationLeftUp: {
        latitude: parseFloat(arr[0].split(',')[0]),
        longitude: parseFloat(arr[0].split(',')[1])
      },
      locationRightUp: {
        latitude: parseFloat(arr[1].split(',')[0]),
        longitude: parseFloat(arr[1].split(',')[1])
      },
      locationLeftDown: {
        latitude: parseFloat(arr[2].split(',')[0]),
        longitude: parseFloat(arr[2].split(',')[1])
      },
      locationRightDown: {
        latitude: parseFloat(arr[3].split(',')[0]),
        longitude: parseFloat(arr[3].split(',')[1])
      }
    }


      console.log("PARSED LOCATION:",parsedLocation);
      

  const url = `https://localhost:7021/api/subject/create-subject`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name,
      subjectCode,
      teacherId,
      location: parsedLocation,
    }),
    credentials: 'include',
  })

  const data = await response.json()
  console.log("DATA:", data)

  return data
})