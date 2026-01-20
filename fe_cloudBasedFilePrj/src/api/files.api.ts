export const fetchFiles = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/file/list`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const json = await res.json();

  if (json.success === true) {
    return json.data;
  }

  return [];
};
export const fetchTrashFiles = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/file/trash`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const json = await res.json();

  if (json.success === true) {
    return json.data;
  }

  return [];
};
export const fetchFileDetail = async (id: string, newName: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/rename/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_name: newName }),
      credentials: 'include',
    }
  );
  const json = await res.json();
  if (json.success === true) {
    return json.data;
  }
  return null;
};
