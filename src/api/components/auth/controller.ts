import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

import { AuthService } from '../../../services/auth';
import { UtilityService } from '../../../services/utility';

import { User } from '../user/model';
import { Address } from '../address/model';
import { UserRepository } from '../user/repository';
import { AddressRepository } from '../address/repository';

export class AuthController {
	private readonly authService: AuthService = new AuthService();

	private readonly userRepo: UserRepository = new UserRepository();
	private readonly addressRepo: AddressRepository = new AddressRepository();

	/**
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async signinUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { email, password } = req.body;

			const user: User | undefined = await this.userRepo.read({
				select: ['id', 'email', 'firstname', 'lastname', 'password', 'active'],
				where: {
					email,
					active: true
				}
			});

			if (!user || !(await UtilityService.verifyPassword(password, user.password))) {
				return res.status(401).json({ status: 401, error: 'Wrong email or password' });
			}

			// Create jwt -> required for further requests
			const token: string = this.authService.createToken(user.id);

			// Don't send user password in response
			delete user.password;

			return res.json({ token, user });
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Register new user
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async registerUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { email, firstname, lastname, password
			, co, street, hauseNr, zip, city, country } = req.body;

			const user: User | undefined = await this.userRepo.read({
				where: {
					email
				}
			});

			if (user) {
				return res.status(400).json({ error: 'Email is already taken' });
			}

			const newUser = new User(
				email,
				firstname,
				lastname,
				await UtilityService.hashPassword(password),
				true

			);
			const newAddress = new Address(co, street, hauseNr, zip, city, country);
			await this.addressRepo.save(newAddress);
			
			
			newUser.address = newAddress;
			const savedUser = await this.userRepo.save(newUser);

			return res.status(200).json(savedUser);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Unregister user
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async unregisterUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { email } = req.user as User;

			const user: User | undefined = await this.userRepo.read({
				where: {
					email
				}
			});

			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			await this.userRepo.delete(user);

			return res.status(204).send();
		} catch (err) {
			return next(err);
		}
	}

}
