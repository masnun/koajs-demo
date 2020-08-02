

const MODULES = ["./ads"];

const bootstrap = require("./bootstrap");

bootstrap(MODULES).catch((err) => {
  console.error(err);
  process.exit();
});
