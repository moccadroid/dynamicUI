'use server';
import { converBase64ToImage } from 'convert-base64-to-image';

// eslint-disable-next-line @typescript-eslint/require-await
export async function saveBase64Image(image: string) {
  'use server';

  const filename = `screenshot-${generateRandomString()}.png`;
  const relativePath = '/public/screenshots/' + filename;
  const path = process.cwd() + relativePath;

  converBase64ToImage(image, path);

  return relativePath;
}

function generateRandomString(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
