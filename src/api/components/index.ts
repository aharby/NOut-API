import { Router } from 'express';

import { AuthRoutes } from './auth/routes';
import { UserRoutes } from './user/routes';
import { InterestRoutes } from './interest/routes';

/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerApiRoutes(router: Router, prefix: string = ''): void {
	router.use(`${prefix}/auth`, new AuthRoutes().router);
	router.use(`${prefix}/users`, new UserRoutes().router);
	router.use(`${prefix}/interests`, new InterestRoutes().router);
}
