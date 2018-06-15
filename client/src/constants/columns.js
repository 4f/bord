import { generateRequestSymbols } from "../utils/helpers";

export default {
  ...generateRequestSymbols('COLUMNS', {
    update: { method: "PUT",    path: "/columns" },
    create: { method: "POST",   path: "/columns" },
    remove: { method: "DELETE", path: "/columns" }
  })
};
