/**
 * Sends a standardized success response.
 * @param {Response} res
 * @param {*} data
 * @param {string} message
 * @param {number} statusCode
 */
const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
  const body = { success: true, message };
  if (data !== null) body.data = data;
  return res.status(statusCode).json(body);
};

/**
 * Sends a standardized error response.
 * @param {Response} res
 * @param {string} message
 * @param {number} statusCode
 * @param {*} errors
 */
const sendError = (res, message = 'Error', statusCode = 500, errors = null) => {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
};

module.exports = { sendSuccess, sendError };
