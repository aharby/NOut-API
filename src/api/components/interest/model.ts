import { Column, Entity, PrimaryColumn } from 'typeorm';

import { nanoid } from 'nanoid'

@Entity()
export class Interest {

	constructor(name: string) {
		this.id = nanoid();
		this.name= name;
	}

	@PrimaryColumn("varchar", {
		length: 22
		})
	id: string;

	@Column()
	public name: string;

	public static mockTestInterest(): Interest {
		return new Interest('Tennis');
	}

}
