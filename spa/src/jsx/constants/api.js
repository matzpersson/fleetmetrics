const GATEWAY_API_HOST = process.env.REACT_APP_GATEWAY_API_HOST
const GATEWAY_API_PORT = process.env.REACT_APP_GATEWAY_API_PORT
const url = `http://${GATEWAY_API_HOST}:${GATEWAY_API_PORT}/api`;

export const assetUrl = `${url}/assets`;
export const userUrl = `${url}/users`;

