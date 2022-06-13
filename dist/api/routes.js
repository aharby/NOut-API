"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRestRoutes = void 0;
const components_1 = require("./components");
const middleware_1 = require("./middleware");
/**
 * Init Express REST routes
 *
 * @param {Router} router
 * @returns {void}
 */
function initRestRoutes(router) {
    const prefix = '/api/v1';
    router.get(prefix, (req, res) => res.send('PING'));
    middleware_1.registerMiddleware(router);
    components_1.registerApiRoutes(router, prefix);
    middleware_1.registerErrorHandler(router);
}
exports.initRestRoutes = initRestRoutes;
//# sourceMappingURL=routes.js.map