// api/subject/subjectInfoDelete.ts
export default defineEventHandler(async (event) => {
  const { id, accessToken } = await readBody(event);
  console.log("BODYDELETE:", { id, accessToken });

  if (!id || !accessToken) {
    return { error: 'Missing required fields' };
  }

  const url = `https://localhost:7021/api/subjectInfo/delete-SubjectInfo/${id}`;
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

  let data;
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : { success: true };
  } catch (err) {
    console.warn('ไม่สามารถ parse JSON ได้:', err);
    data = { success: true };
  }

  console.log("DATA:", data);
  return data;
});
