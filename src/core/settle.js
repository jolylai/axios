export default function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
  }
}
