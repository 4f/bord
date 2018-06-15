import fetch from 'isomorphic-fetch';
import config from '../constants/config';

// import mock from '../mock';

export function http({ dispatch, getState, payload, options: { SUCCESS, REQUEST, FAILURE, method, path } }) {
  const { services: { serverStatus } } = getState();

  if (serverStatus[REQUEST]) {
    const error = `wait the response ${REQUEST.toString()}`;
    console.info(error);
    return Promise.resolve({ error });
  }
  dispatch({ type: REQUEST, pl: payload, request: REQUEST });

  // let pl = method == "GET" ? mock : payload;
  // dispatch({ type: SUCCESS, pl, success: REQUEST });
  // return Promise.resolve(true);

  return callApi(path, { method }, payload)
    .then(pl => {
      dispatch({ type: SUCCESS, pl, success: REQUEST });
      return pl;
    })
    .catch(pl => {
      dispatch({ type: FAILURE, pl, error: true, failure: REQUEST })
      return { error: pl }
    });
};

export default function callApi(path, options, payload) {
  if (!options.method || options.method === 'GET'){
    var query = Object.keys(payload)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(payload[k])}`)
      .join('&');
    payload = undefined;
    path = `${path}?${query}`;
  };


  return fetch(`${config.apiUrl}${path}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    ...options
  })
    .then(response => response.json())
    .then(json => {
      if (json.success)
        return json;
      throw new Error(json.message);
    })
};
