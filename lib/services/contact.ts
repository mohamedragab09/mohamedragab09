import { ContactForm } from "../types/contact";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


interface ContactResponse {
  message: string;
}

export const submitForm = async (form: ContactForm): Promise<ContactResponse> => {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  const data: ContactResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit contact form');
  }

  return data;
};
