import { getManager } from 'typeorm';

import { AbsRepository } from '../helper';

import { Address } from './model';

export class AddressRepository extends AbsRepository<Address> {
	constructor() {
		super('address', getManager().getRepository(Address));
	}
}
