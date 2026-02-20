import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import fs from "fs";

export default defineConfig({
  plugins: [react()],
  base: "/immujer/",
  /** PARA PRODUCCIÓN **/
  // server: {
  //   https: {
  //     key: fs.readFileSync("./certs/mpassl.key"),
  //     cert: fs.readFileSync("./certs/mpassl.crt"),
  //   },
  //   port: 3061,
  //   host: "0.0.0.0",
  //   allowedHosts: ["qa.acapulco.gob.mx"],
  // },
});
