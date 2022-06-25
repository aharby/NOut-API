import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

import { Interest } from './model';
import { InterestRepository } from './repository';

export class InterestController {
	private readonly repo: InterestRepository = new InterestRepository();

	/**
	 * Read addresses
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	@bind
	async readInterests(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const Interests: Interest[] = await this.repo.readAll({}, true);
			return res.json(Interests);
		} catch (err) {
			return next(err);
		}
	}

	@bind
	async createInterest(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { name } = req.body;

			const existingInterest: Interest | undefined = await this.repo.read({
				where: {
					name
				}
			});

			if (existingInterest) {
				return res.status(400).json({ error: 'Interest already saved' });
			}

			const interest: Interest = new Interest(
				name
			);
			const newInterest: Interest = await this.repo.save(interest);

			return res.json(newInterest);
		} catch (err) {
			return next(err);
		}
	}

}
