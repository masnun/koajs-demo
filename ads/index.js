const Router = require("@koa/router");

// Add paths to router

module.exports = function (app) {
  // load ads related models
  require("./models")(app);

  // Router
  const router = new Router({ prefix: "/ads" });
  app.use(router.routes()).use(router.allowedMethods());

  // Routes

  router.post("/placement/", authToken, async function home(ctx, next) {
    const { placement } = ctx.request.body;

    if (!placement) {
      ctx.status = 400;
      ctx.body = { error: "No placement passed" };
      return await next();
    }

    try {
      const ads = await ctx.models.ads.getByPlacement(placement);
      ctx.body = ads;
    } catch(err) {
      ctx.status = 500
      ctx.body = {"error": "Could not fetch ads"}
    }
    

    ctx.logger.info(
      `Served Ads. Token: ${ctx.authData.token}, Request ID:  ${ctx.request.id}`
    );

    return await next();
  });
};

async function authToken(ctx, next) {

  const token = ctx.get("auth");
  const authData = await ctx.models.auth.findByToken(token);

  if (authData) {
    ctx.authData = authData;

    return await next();
  } else {
    ctx.logger.info(
      `Authentication Failed. Token:  ${token}, Request ID:  ${ctx.request.id}`
    );
    ctx.status = 401;
    ctx.body = { error: "Invalid auth token" };
  }
}
