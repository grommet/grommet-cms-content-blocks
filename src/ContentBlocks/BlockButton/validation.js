/* eslint-disable */
const urlRe = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.|(mailto:)){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

const validLength = str => str && str.length > 0;
const validUrl = url => url && urlRe.test(url);
const validPath = url => url && !urlRe.test(url);

export default {
  validLength,
  validUrl,
  validPath,
};
