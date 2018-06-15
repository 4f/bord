import { generateRequestSymbols } from "../utils/helpers";

export default {
  ...generateRequestSymbols('BORDS', {
    get:    { method: "GET",       path: "/bords" },
    update: { method: "PUT",       path: "/bords" },
    create: { method: "POST",      path: "/bords" }
  })
};
