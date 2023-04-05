# json-ed-aes

`json-ed-aes-gcm` is a simple `aes-256-gsm` encrypt and decrypt module for node.js. This module is build for both Commonjs and ECMAScript.

It is for doing encryption of json object or string using aes-256-gcm with a provided secret and then decrypt the encrypted message with the secret.

The encrypted message is a combination of `encrypted message`, `iv`, `tag` and `salt`.

The `JsonEncryptDecryptAES` constructor takes one required argument `secret`.

The `salt` and `iv` are randomly generated and prepended to the result and secret is the key by which the message is decrypted.

## This Module is not for password generation.

Passwords are one way hash and there are many library you can choose form.

# Install

```
npm install @faizul-mustafiz/json-ed-aes
```

# Usages

## Basic Example

```
const JsonEncryptDecryptAES =  require('@faizul-mustafiz/json-ed-aes').default;
const aes = new JsonEncryptDecryptAES('my-super-secret');

// Encrypt an json object
const encryptMessage = aes.encrypt({  deviceId: '67256558250eda49',});

// Decrypt an encrypted message
const decryptMessage = aes.decrypt(encryptMessage);

console.log('encryptMessage:', encryptMessage);
// encryptMessage: HxMsz/kBD5vKP5IJvgrotFHHDfcOy0YYgZ6ukaGpTDpoJi93PXERAu8ii9m0KJWxm3AWaJnaJTD5e5Ca8wl/MDQL1vgq1Na1M3jBKu3ZMHHpoIT7krzC4pURw3pRgd9j8tQ3NSrwWzzhrIdm03bjmtfR2MgyyNBIj5saQKuMhA==

console.log('decryptMessage:', decryptMessage);
// decryptMessage: { deviceId: '67256558250eda49' }
```
