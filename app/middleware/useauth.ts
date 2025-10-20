export const useAuth = async () => {
  const accessToken = localStorage.getItem('accessToken')

  const response = await fetch('/api/auth/checkauth/', {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken }),
    credentials: 'include',
  })

  const data = await response.json()
  return data
}
export const logout = () => {
  localStorage.removeItem('accessToken')
  return navigateTo('/')
}

