import * as crypto from 'crypto';
import Parser from './utility/parser.utility';

const algorithm = 'aes-256-gcm';
const ivLength = 16;
const saltLength = 64;
const tagLength = 16;
const tagPosition = saltLength + ivLength;
const encryptedPosition = tagPosition + tagLength;
const parser = new Parser();
export default class JsonEncryptDecryptAES {
  constructor(private secret: string) {}

  getKey(salt: Buffer) {
    return crypto.pbkdf2Sync(this.secret, salt, 100000, 32, 'sha512');
  }

  encrypt(payload: any) {
    const { parsedString, size } = parser.parseJsonPayload(payload);
    if (size > 500000) return 'Json size limit exceeded';
    const iv = crypto.randomBytes(ivLength);
    const salt = crypto.randomBytes(saltLength);
    const key = this.getKey(salt);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(String(parsedString), 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
  }

  decrypt(cipherText: string) {
    const stringValue = Buffer.from(String(cipherText), 'base64');
    const salt = stringValue.subarray(0, saltLength);
    const iv = stringValue.subarray(saltLength, tagPosition);
    const tag = stringValue.subarray(tagPosition, encryptedPosition);
    const encrypted = stringValue.subarray(encryptedPosition);
    const key = this.getKey(salt);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(tag);
    return parser.parseStringPayload(decipher.update(encrypted) + decipher.final('utf-8'));
  }
}
