import 'reflect-metadata';

// Set env variables from .env file

import { config } from 'dotenv';
config();

import express from 'express';
import { initRestRoutes } from './api/routes';

import { createConnection, Connection } from 'typeorm';

import { env } from './config/globals';
import { logger } from './config/logger';

import { RedisService } from './services/redis';

// Startup
(async function main() {
	try {
		// Connect db
		console.log('Initializing ORM connection...');
		const connection: Connection = await createConnection();


		// Connect redis
		RedisService.connect();

		// Init express app and routes
		const app = express();
		
		initRestRoutes(app);

		const port = env.NODE_PORT;

		app.listen(port, () => {
			logger.info(`Example app listening on port ${port} in ${env.NODE_ENV} mode`)
			console.log(`Example app listening on port ${port} in ${env.NODE_ENV} mode`)
		  }); 

	} catch (err) {
		logger.error(err.stack);
	}
})();
