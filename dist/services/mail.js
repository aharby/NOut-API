"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const ejs_1 = require("ejs");
const nodemailer_1 = require("nodemailer");
const path_1 = require("path");
const globals_1 = require("../config/globals");
const logger_1 = require("../config/logger");
/**
 * MailService
 *
 * Service for sending emails
 */
class MailService {
    constructor() {
        this.transporter = nodemailer_1.createTransport(globals_1.env.SMTP);
    }
    /**
     * Send email
     *
     * @param options Mail options
     * @param forceSend Force email to be sent
     * @returns info of sent mail
     */
    sendMail(options, forceSend = false) {
        if (globals_1.env.NODE_ENV === 'production' || forceSend) {
            return this.transporter.sendMail(options);
        }
        logger_1.logger.info('Emails are only sent in production mode!');
    }
    /**
     * Render EJS template for Email
     *
     * @param templatePath Path of template to render
     * @param templateData Data for template to render
     */
    renderMailTemplate(templatePath, templateData) {
        return ejs_1.renderFile(path_1.resolve(templatePath), templateData);
    }
}
exports.MailService = MailService;
//# sourceMappingURL=mail.js.map