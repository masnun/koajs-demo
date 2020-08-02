require("dotenv").config();

const koaLogger = require("koa-logger");
const json = require("koa-json");
const cors = require("koa-cors");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const mount = require("koa-mount");
const uuid = require("uuid");

const mongodb = require("./utils/mongodb");
const logger = require("./utils/logging")("web");

const Koa = require("koa");

module.exports = async function (modules) {
  const app = new Koa();

  loadMiddlewares(app);

  // Set some app context
  app.context.db = await mongodb();
  app.context.models = {};
  app.context.logger = logger;

  // Load the modules
  Object.values(modules).forEach((path) => {
    require(path)(app);
  });

  // Start app
  app.listen(process.env.PORT, () => {
    logger.info(`App started: http://0.0.0.0:${process.env.PORT} `);
  });
};

// Load middlewares
function loadMiddlewares(app) {

  //// ----> Onion model demo

  app.use(async (ctx, next) => {
    console.log("hello world");
    await next();
    console.log("bye bye cruel world")

  })



  //// ----> Actual middlewares

  // body parser
  app.use(bodyParser());
  // cors middleware
  app.use(cors());
  // Log incoming requests
  app.use(
    koaLogger((str, args) => {
      logger.info(str);
    })
  );
  // Serve JSON
  app.use(json());

  // mount static path
  app.use(mount("/static", serve("./static")));

  // unique request id
  app.use(async function(ctx, next) {
    ctx.request.id = uuid.v4();
    return await next();
  })
}
