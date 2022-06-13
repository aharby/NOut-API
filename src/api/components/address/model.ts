import { Column, Entity, PrimaryColumn } from 'typeorm';

import { nanoid } from 'nanoid'

@Entity()
export class Address {

	constructor(co: string, street: string, hauseNr: string, zip: string, 
		city: string, country: string) {
		this.id = nanoid();
		this.co= co;
		this.street= street;
		this.hauseNr= hauseNr;
		this.zip= zip;
		this.city= city;
		this.country= country;
		
	}

	@PrimaryColumn("varchar", {
		length: 22
		})
	id: string;

	@Column()
	public co: string;

	@Column()
	public street: string;

	@Column()
	public hauseNr: string;

	@Column()
	public zip: string;

	@Column()
	public city: string;

	@Column()
	public country: string;

	public static mockTestAddress(): Address {
		return new Address('methany','Friedrich str.','32','47532','Berlin','Germany');
	}

}
