'use server';
import { userData } from '@/api/db/dataAndLayouts';
import fs from 'fs';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/require-await
export async function GETData() {
  'use server';

  console.log('GETData');
  return userData.data;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function GETComponentConfig() {
  'use server';

  console.log('GETComponentConfig');
  const filePath = path.join(process.cwd() + '/src/interfaces/components/ComponentConfig.ts');
  return fs.readFileSync(filePath, 'utf-8');
}
