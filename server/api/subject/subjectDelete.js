// api/subject/subjectDelete.ts
import {BASE_API_URL } from '../util/httputil.js'

export default defineEventHandler(async (event) => {
  const { subjectId, accessToken } = await readBody(event)
  console.log("BODYDELETE ", { subjectId, accessToken });

  if (!subjectId || !accessToken) {
    return { error: 'Missing required fields' };
  }

  const url = BASE_API_URL + `/api/subject/delete-subject/${subjectId}`;
  console.log("URL:", url);

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    },
    credentials: 'include',
  });

   return response
});
