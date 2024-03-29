import CryptoJS from 'crypto-js';

export const encryptPassword = (_password: string, _secrete: string) => {
  let salt = CryptoJS.lib.WordArray.random(128 / 8);

  let key = CryptoJS.PBKDF2(_secrete, salt, {
    keySize: 256 / 32,
    iterations: 100,
  });

  let iv = CryptoJS.lib.WordArray.random(128 / 8);

  let encrypted = CryptoJS.AES.encrypt(_password, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  let encryptedPass = salt.toString() + iv.toString() + encrypted.toString();
  return encryptedPass;
};

export const decryptPassword = (_password: string, _secrete: string) => {
  let salt = CryptoJS.enc.Hex.parse(_password.substr(0, 32));
  let iv = CryptoJS.enc.Hex.parse(_password.substr(32, 32));
  let encrypted = _password.substring(64);

  let key = CryptoJS.PBKDF2(_secrete, salt, {
    keySize: 256 / 32,
    iterations: 100,
  });

  let decryptedPass = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return decryptedPass.toString(CryptoJS.enc.Utf8);
};

export const getEncrypted = (data: any, key: string) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return encrypted;
};

export const getDecrypted = (data: any, key: string) => {
  const bytes = CryptoJS.AES.decrypt(data, key);
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decrypted;
};

export const getEncryptedHex = (data: any, key: string) => {
  const b64 = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  const e64 = CryptoJS.enc.Base64.parse(b64);
  const eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
};

export const getDecryptedHex = (cipherText: any, key: string) => {
  const reb64 = CryptoJS.enc.Hex.parse(cipherText);
  const bytes = reb64.toString(CryptoJS.enc.Base64);
  const decrypt = CryptoJS.AES.decrypt(bytes, key);
  const decrypted = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
  return decrypted;
};

export const getRandomString = (_length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < _length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getRandomNumber = (_length: number) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < _length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
