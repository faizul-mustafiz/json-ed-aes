import JsonEncryptDecryptAES from '../src/index';
const aes = new JsonEncryptDecryptAES('my-secret');

const encryptedMessage = aes.encrypt({
  deviceId: 'your-device-hash',
});
console.log('encryptedMessage', encryptedMessage);

const decryptMessage = aes.decrypt(encryptedMessage);
console.log('decryptMessage', decryptMessage);
