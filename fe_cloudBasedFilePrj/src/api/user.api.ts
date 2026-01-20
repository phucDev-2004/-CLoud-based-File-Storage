import { form } from 'framer-motion/client';

export const fetchInfoUser = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/profile`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );

  const json = await res.json();

  if (json.success === true) {
    return json.data;
  }

  return [];
};
export const updateInfoUser = async (props: { formData: FormData }) => {
  const { formData } = props;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/update`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include', // Gửi kèm cookie
    }
  );
  const json = await res.json();

  if (json.success === true) {
    return json.data;
  }
  return null;
};
