import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

import { Address } from './model';
import { AddressRepository } from './repository';

export class AddressController {
	private readonly repo: AddressRepository = new AddressRepository();

	/**
	 * Read addresses
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async readAddresses(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const Addresses: Address[] = await this.repo.readAll({}, true);
			return res.json(Addresses);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Read user
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async readAddress(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { addressID } = req.params;

			const address: Address | undefined = await this.repo.read({
				where: {
					id: +addressID
				}
			});

			return res.json(address);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Create address
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async createAddress(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { co, street, hauseNr, zip, city, country } = req.body;

			const address = new Address(co, street, hauseNr, zip, city, country);
			const newAddress: Address = await this.repo.save(address);

			return res.json(newAddress);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Delete address
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async deleteAddress(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { addressID } = req.params;

			const address: Address | undefined = await this.repo.read({
				where: {
					id: +addressID
				}
			});

			if (!address) {
				return res.status(404).json({ error: 'Address not found' });
			}

			await this.repo.delete(address);

			return res.status(204).send();
		} catch (err) {
			return next(err);
		}
	}
}
