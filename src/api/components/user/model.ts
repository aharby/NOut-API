import { nanoid } from 'nanoid';
import { Column, CreateDateColumn, Entity, PrimaryColumn, Timestamp, OneToOne, JoinColumn } from 'typeorm';

import { Address } from '../address/model';

@Entity()
export class User {

	constructor(email: string, firstname: string, lastname: string, password: string, active: boolean) {
		this.id = nanoid();
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.password = password;
		this.active = active;
	}

	@PrimaryColumn("varchar", {
		length: 22
		})
	id: string;

	@Column({
		nullable: false,
		unique: true
	})
	public email: string;

	
	@Column()
	public firstname: string;

	@Column()
	public lastname: string;

	@Column({
		select: false
	})
	public password: string;

	@Column({
		default: true
	})
	public active: boolean;

	@CreateDateColumn()
	public created: Timestamp;

	@OneToOne(() => Address)
    @JoinColumn()
    address: Address;
	
	public static mockTestUser(): User {
		const user = new User( 'test@email.com', 'testFirstname', 'testLastname', 'testPassword', true);
		user.address = new Address('methany','Friedrich str.','32','47532','Berlin','Germany');
		return user;
	}
}
