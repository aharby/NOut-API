"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
class Server {
    constructor() {
        this._app = express_1.default();
        routes_1.initRestRoutes(this._app);
    }
    /**
     * Get Express app
     *
     * @returns {express.Application} Returns Express app
     */
    get app() {
        return this._app;
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map