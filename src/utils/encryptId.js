import AES from 'crypto-js/aes';
const encryptId = (str) => {
  const ciphertext = AES.encrypt(str, process.env.REACT_APP_CRYPTO_SECRET);
  return encodeURIComponent(ciphertext.toString());
};

export default encryptId;
