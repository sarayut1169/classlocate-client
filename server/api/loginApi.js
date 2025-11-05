
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import {BASE_API_URL } from '../api/util/httputil.js'
export default defineEventHandler(async (event) => {
  try {
    const method = event.req.method
    const requestBody = await readBody(event)

    const { email, password } = requestBody || {}

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: email or password',
      })
    }

    const url = BASE_API_URL + `/api/user/login`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'content-type': 'application/json',
      },
      credentials: 'include', // ✅ สำคัญมาก

      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `Login failed: ${response.statusText}`,
      })
    }
    else {
      const result = await response.json()
      return {
        resultData: result.resultData
      }
    }


  } catch (error) {
    console.error("Login error:", error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Internal Server Error',
    })
  }
})