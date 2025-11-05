// api/subject/subjectUpdate.js
import { BASE_API_URL } from '../util/httputil.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("BODYDATA:", body)

  const { id, name, teacherId, subjectCode, location, accessToken } = body

  if (!id || !accessToken) {
    return { error: 'Missing required fields' }
  }

  // ✅ แปลง location เป็น array และตรวจสอบความถูกต้อง
  let arr = []

  try {
    if (typeof location === 'string') {
      arr = JSON.parse(location)
    } else if (Array.isArray(location)) {
      arr = location
    } else {
      throw new Error('Invalid location format')
    }

    if (!Array.isArray(arr) || arr.length !== 8) {
      throw new Error('Location array must contain 8 elements')
    }
  } catch (err) {
    console.error("Location parsing error:", err)
    return { error: 'Invalid location data' }
  }

  // ✅ แปลงเป็น object ที่ backend ต้องการ
  const parsedLocation = {
    locationLeftUp: {
      latitude: parseFloat(arr[0]),
      longitude: parseFloat(arr[1]),
    },
    locationRightUp: {
      latitude: parseFloat(arr[2]),
      longitude: parseFloat(arr[3]),
    },
    locationLeftDown: {
      latitude: parseFloat(arr[4]),
      longitude: parseFloat(arr[5]),
    },
    locationRightDown: {
      latitude: parseFloat(arr[6]),
      longitude: parseFloat(arr[7]),
    },
  }

  console.log("PARSED LOCATION:", parsedLocation)

  const url = BASE_API_URL + `/api/subject/update-subject`

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

  console.log("reseiei",response);
  
  return response
})