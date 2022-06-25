import 'reflect-metadata';

// Set env to test
process.env.NODE_ENV = 'test';

// Set env variables from .env file
import { config } from 'dotenv';
config();

import { createConnection, ConnectionOptions, Connection } from 'typeorm';

import express from 'express';
import supertest from 'supertest';

import { env } from '../config/globals';

import { RedisService } from '../services/redis';

/**
 * TestFactory
 * - Loaded in each unit test
 * - Starts server and DB connection
 */

export class TestFactory {
	private _app= express();
	private _connection: Connection;

	// DB connection options
	private options: ConnectionOptions = {
		type: 'sqljs',
		database: new Uint8Array(),
		location: 'database',
		logging: false,
		synchronize: true,
		entities: ['dist/api/components/**/model.js']
	};

	public get app(): supertest.SuperTest<supertest.Test> {
		return supertest(this._app);
	}

	public get connection(): Connection {
		return this._connection;
	}

	public async init(): Promise<void> {
		// logger.info('Running startup for test case');
		await this.startup();
	}

	/**
	 * Close DB connection
	 */
	public async close(): Promise<void> {
		this._connection.close();
		RedisService.disconnect();
	}

	/**
	 * Connect to DB and start express app
	 */
	private async startup(): Promise<void> {
		this._connection = await createConnection(this.options);
		RedisService.connect();
		this._app.listen(env.NODE_PORT);
	}
}
