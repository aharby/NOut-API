import { Router } from 'express';
import { body, param } from 'express-validator';

import { AuthService, PassportStrategy } from '../../../services/auth';

import { IComponentRoutes } from '../helper';

import { AddressController } from './controller';

export class AddressRoutes implements IComponentRoutes<AddressController> {
	readonly name: string = 'address';
	readonly controller: AddressController = new AddressController();
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
			this.controller.readAddresses
		);

		this.router.get(
			'/:addressID',
			//this.authSerivce.isAuthorized(),
			//this.authSerivce.hasPermission(this.name, 'read'),
			param('addressID').isString(),
			this.authSerivce.validateRequest,
			this.controller.readAddress
		);

		this.router.post(
			'/',
			//this.authSerivce.isAuthorized(),
			//this.authSerivce.hasPermission(this.name, 'create'),
			//body('name').isString(),
			this.authSerivce.validateRequest,
			this.controller.createAddress
		);

		this.router.delete(
			'/:AddressID',
			//this.authSerivce.isAuthorized(),
			//this.authSerivce.hasPermission(this.name, 'delete'),
			param('AddressID').isString(),
			this.authSerivce.validateRequest,
			//this.controller.deleteUserAddress
		);
	}
}
