import {
  createDecipheriv,
  createCipheriv,
  randomBytes,
  CipherGCMTypes,
  scryptSync,
} from 'crypto';

export type Secrets = {
  [key: string]: string,
}

const algorithm: CipherGCMTypes = "aes-256-gcm";
const saltLength = 32;
const ivLength = 12;
const authTagLength = 16;
const keyLength = 32;

export function decrypt(fileBuffer: Buffer, password: Buffer): Secrets {
  var lowerBound = 0;
  const cryptoMeta = [];
  for (let length of [saltLength, ivLength, authTagLength]) {
    cryptoMeta.push(fileBuffer.slice(lowerBound, lowerBound += length));
  }

  const [salt, iv, authTag] = cryptoMeta;
  const data = fileBuffer.slice(lowerBound);

  const key = scryptSync(password, salt, keyLength);
  const decipher = createDecipheriv(algorithm, key, iv, { authTagLength });
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(data),
    decipher.final(),
  ]);

  return JSON.parse(decrypted.toString());
}

export function encrypt(data: Secrets, password: Buffer): Buffer {
  const json = Buffer.from(JSON.stringify(data));
  const salt = randomBytes(saltLength);
  const iv = randomBytes(ivLength);

  const key = scryptSync(password, salt, keyLength);
  const cipher = createCipheriv(algorithm, key, iv, { authTagLength });
  const encrypted = Buffer.concat([
    cipher.update(json),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return Buffer.concat([
    salt,
    iv,
    authTag,
    encrypted,
  ]);
}
