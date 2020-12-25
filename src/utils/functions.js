/**
 * Return the min id found in an object containing object with an `id` field.
 * For example: Board, TaskList, Task...
 *
 * @param {object} obj - the object containing objects with an `id` field
 */
export function getMinId(array) {
  const minId = array.reduce(
    (minId, element) => Math.min(element.id, minId),
    -1
  );

  return minId;
}

/**
 * Return the max key id found in an object containing an `id` field as key.
 * For example: Board, TaskList, Task...
 *
 * @param {object} obj - the object containing objects with an `id` field
 */
export function getMaxId(obj) {
  if (!Object.keys(obj).length) {
    return -1;
  }

  return Math.max.apply(null, Object.keys(obj));
}

/**
 * Find the next id of an object containing objects with an `id` field.
 *
 * @param {object} obj - the object to get the next id from
 */
export function getNextId(obj) {
  const maxId = getMaxId(obj);

  return maxId + 1;
}

/**
 * Filter an Object containing multiple Object with an `id` field.
 *
 * @param {object} obj        - the object to filter
 * @param {number[]} idsToRemove - id of the objects to remove in `obj`
 */
export function filterObject(obj, idsToRemove) {
  let newObj = {};

  Object.keys(obj).forEach((keyId) => {
    if (!idsToRemove.includes(Number(keyId))) {
      newObj[keyId] = { ...obj[keyId] };
    }
  });

  return newObj;
}
