/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortStart = arr.slice();
  sortStart.sort(function(a, b) {return a.normalize().localeCompare(b.normalize().toUpperCase());});
  return (param === 'desc') ? sortStart.reverse() : sortStart;
}
