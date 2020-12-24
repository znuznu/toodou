/**
 * Return the min id found in a list of objects containing an `id` field.
 * For example: Board, TaskList, Task...
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
 */
export function getMaxId(obj) {
  if (!Object.keys(obj).length) {
    return -1;
  }

  return Math.max.apply(null, Object.keys(obj));
}

export function getNextId(obj) {
  // Find the max board id  and add +1
  const maxId = getMaxId(obj);

  return maxId + 1;
}
