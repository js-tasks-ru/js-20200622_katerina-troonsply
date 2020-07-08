/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (obj) {
    const obj2 = {};
    const keys = Object.keys(obj);
    keys.forEach(function(key) {
      const value = obj[key];
      obj2[value] = key;
    });
    return obj2;
  }
  return obj;
}
