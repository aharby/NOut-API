"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerApiRoutes = void 0;
const routes_1 = require("./auth/routes");
const routes_2 = require("./user/routes");
const routes_3 = require("./address/routes");
/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
function registerApiRoutes(router, prefix = '') {
    router.use(`${prefix}/auth`, new routes_1.AuthRoutes().router);
    router.use(`${prefix}/users`, new routes_2.UserRoutes().router);
    router.use(`${prefix}/addresses`, new routes_3.AddressRoutes().router);
}
exports.registerApiRoutes = registerApiRoutes;
//# sourceMappingURL=index.js.map