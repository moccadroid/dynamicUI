'use server';
import { userData } from '@/api/db/dataAndLayouts';

// eslint-disable-next-line @typescript-eslint/require-await
export async function GETData() {
  'use server';

  console.log('GETData');
  return userData.data;
}
