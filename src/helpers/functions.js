/**
 * Return the min id found in an object containing object with an `id` field.
 * For example: Board, TaskList, Task...
 *
 * @param {object} obj - the object containing objects with an `id` field
 */
export function getMinId(obj) {
  if (!Object.keys(obj).length) {
    return -1;
  }

  return Math.min.apply(null, Object.keys(obj));
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
export function getNewNextId(obj) {
  const maxId = getMaxId(obj);

  return maxId + 1;
}

/**
 * Filter an Object containing multiple Object with an `id` field.
 *
 * @param {object} obj            - the object to filter
 * @param {number[]} idsToRemove  - id of the objects to remove in `obj`
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

/**
 * Return the next number found in an array of id.
 * For example in state: `taskLists` in board, `tasks` in taskLists...
 *
 * @param {number[]} array - the array containing ids
 */
export function getNewNextIdFromArray(array) {
  const maxId = array.reduce(
    (maxId, element) => Math.min(element.id, maxId),
    -1
  );

  return maxId + 1;
}
