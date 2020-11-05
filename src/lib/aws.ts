import { Storage } from 'aws-amplify';

export async function s3Upload(file: File) {
  const filename = `${Date.now()}-${file.name}`;

  const stored: any = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  console.log(stored);

  return stored.key;
}
