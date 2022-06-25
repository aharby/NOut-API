import { Router } from 'express';
import { body, param } from 'express-validator';

import { AuthService, PassportStrategy } from '../../../services/auth';

import { IComponentRoutes } from '../helper';

import { InterestController } from './controller';

export class InterestRoutes implements IComponentRoutes<InterestController> {
	readonly name: string = 'interest';
	readonly controller: InterestController = new InterestController();
	readonly router: Router = Router();
	authSerivce: AuthService;

	public constructor(defaultStrategy?: PassportStrategy) {
		this.authSerivce = new AuthService(defaultStrategy);
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get(
			'/',
		//	this.authSerivce.isAuthorized(),
		//	this.authSerivce.hasPermission(this.name, 'read'),
			this.controller.readInterests
		);

		this.router.post(
			'/',
		//	this.authSerivce.isAuthorized(),
		//	this.authSerivce.hasPermission(this.name, 'read'),
			this.controller.createInterest
		);

	}
}
