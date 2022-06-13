import { Router } from 'express';
import { body } from 'express-validator';

import { AuthService, PassportStrategy } from '../../../services/auth';

import { IComponentRoutes } from '../helper';

import { AuthController } from './controller';

export class AuthRoutes implements IComponentRoutes<AuthController> {
	readonly name: string = 'auth';
	readonly controller: AuthController = new AuthController();
	readonly router: Router = Router();
	authSerivce: AuthService;

	constructor(defaultStrategy?: PassportStrategy) {
		this.authSerivce = new AuthService(defaultStrategy);
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.post(
			'/signin',
			body('email').isEmail(),
			body('password').isString(),
			this.authSerivce.validateRequest,
			this.controller.signinUser
		);

		this.router.post(
			'/register',
			body('email').isEmail(),
			body('firstname').isString(),
			body('lastname').isString(),
			body('password').isString(),
			body('co').isString(),
			body('street').isString(),
			body('hauseNr').isString(),
			body('zip').isString(),
			body('city').isString(),
			body('country').isString(),
			this.authSerivce.validateRequest,
			this.controller.registerUser
		);

		this.router.post('/unregister', this.authSerivce.isAuthorized(), this.controller.unregisterUser);
	}
}
