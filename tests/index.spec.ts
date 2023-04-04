import 'mocha';
import { should, expect } from 'chai';
import JsonEncryptDecryptAES from '../src/index';

let aes: any;
let encryptedMessage = '';
const testJson = {
  deviceId: '67256558250eda49',
};
describe('json-ed-aes-gcm Package Test', () => {
  before((done) => {
    aes = new JsonEncryptDecryptAES('my-super-secret');
    done();
  });
  describe('encryption-test', () => {
    it('it should encrypt a json object using encrypt()', (done) => {
      encryptedMessage = aes.encrypt(testJson);
      expect(encryptedMessage).to.be.string;
      done();
    });
  });
  describe('decryption-test', () => {
    it('it should decrypt encrypted message using decrypt()', (done) => {
      let decryptMessage = aes.decrypt(encryptedMessage);
      expect(decryptMessage).have.property('deviceId').equal(testJson.deviceId);
      done();
    });
  });
});
