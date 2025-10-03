// api/subject/subjectDelete.ts
export default defineEventHandler(async (event) => {
  const { subjectId, accessToken } = await readBody(event)
  console.log("BODYDELETE ", { subjectId, accessToken });

  if (!subjectId || !accessToken) {
    return { error: 'Missing required fields' };
  }

  const url = `https://localhost:7021/api/subject/delete-subject/${subjectId}`;
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

  const data = await response.json();
  console.log("DATA:", data);

  return data;
});
