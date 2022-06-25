import { getManager } from 'typeorm';

import { AbsRepository } from '../helper';

import { Interest } from './model';

export class InterestRepository extends AbsRepository<Interest> {
	constructor() {
		super('interest', getManager().getRepository(Interest));
	}
}
