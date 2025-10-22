// api/subject/subjectUpdate.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA:", body)


 const { id, name, teacherId, subjectCode, location, accessToken } = body

  if (!id || !accessToken) {
    return { error: 'Missing required fields' }
  }

  // แปลง location array เป็น object
    const raw = location;
    const arr = JSON.parse(raw);
    console.log("EIEIEIE",arr[0]); // "0,0"

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
      

  const url = `https://localhost:7021/api/subject/update-subject`

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      id,
      name,
      subjectCode,
      teacherId,
      location: parsedLocation,
    }),
    credentials: 'include',
  })

  return response
})