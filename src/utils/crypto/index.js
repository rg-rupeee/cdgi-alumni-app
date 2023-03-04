const crypto = require('node:crypto');
const constants = require('../../commons/constants');

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const algorithm = constants.CRYPTO.HASH.ALGORITHM;

exports.encrypt = (text) => {
  text = Buffer.from(text.toString(), 'utf-8');
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encrypted: encrypted.toString('hex') };
};

exports.decrypt = ({ initVector, encryptedData }) => {
  const iv = Buffer.from(initVector, 'hex');
  const encryptedText = Buffer.from(encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

exports.generateUUID = () => crypto.randomUUID();
