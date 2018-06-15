import { generateRequestSymbols } from "../utils/helpers";

export default {
  ...generateRequestSymbols('CARDS', {
    update: { method: "PUT",    path: "/cards" },
    create: { method: "POST",   path: "/cards" },
    remove: { method: "DELETE", path: "/cards" }
  })
};
