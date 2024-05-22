import CryptoJS from 'crypto-js';

const crypto = CryptoJS;

const keys = {
  key: crypto.enc.Utf8.parse('37911490979715163134003223491201'),
  second_key: crypto.enc.Utf8.parse('54674138327930866480207815084989'),
  iv: crypto.enc.Utf8.parse('3134003223491201'),
};

/**
 * Parses the embedded video URL to encrypt-ajax.php parameters
 * @param {cheerio} $ Cheerio object of the embedded video page
 * @param {string} id Id of the embedded video URL
 */
export async function generateEncryptAjaxParameters($, id) {
  try {
    // encrypt the key
    const encrypted_key = crypto.AES.encrypt(id, keys.key, {
      iv: keys.iv,
    }).toString();

    const script = $("script[data-name='episode']").data().value;
    const decrypted_script = crypto.AES.decrypt(script, keys.key, {
      iv: keys.iv,
    }).toString(crypto.enc.Utf8);

    return `id=${encrypted_key}&alias=${id}&${decrypted_script}`;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Decrypts the encrypted-ajax.php response
 * @param {object} obj Response from the server
 */
export function decryptEncryptAjaxResponse(obj) {
  try {
    const decrypted = crypto.enc.Utf8.stringify(
      crypto.AES.decrypt(obj.data, keys.second_key, {
        iv: keys.iv,
      })
    );
    return JSON.parse(decrypted);
  } catch (error) {
    console.error(error);
    return null;
  }
}