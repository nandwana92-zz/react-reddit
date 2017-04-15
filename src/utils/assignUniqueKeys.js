import shortid from 'shortid';
import { keyBy }  from 'lodash';

function assignUniqueKeys(data) {
  return keyBy(data, (value) => {
    return shortid.generate();
  });
}

module.exports = assignUniqueKeys;
