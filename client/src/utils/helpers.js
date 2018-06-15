
import { http } from '../utils/api_call'

export function generateRequestSymbols(name, out_obj) {
  const REQUESTS = ["REQUEST", "SUCCESS", "FAILURE"];
  for (let key in out_obj) {
    REQUESTS.forEach(m =>
      out_obj[key][m] = Symbol(`${name.toUpperCase()}/${key.toUpperCase()}/${m.toUpperCase()}`)
    )
  }
  return out_obj;
}


export const generateRegisters = (types) => {
  const register = (symbol) => (payload) => (dispatch, getState) => {
    return http({ options: types[symbol], dispatch, getState, payload })
  }
  let out = {};
  for (let key in types) {
    if (types[key].SUCCESS) out[key] = register(key);
  }
  return out;
}
