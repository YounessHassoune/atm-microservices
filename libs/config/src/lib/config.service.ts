import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;
    constructor() {
        const file: Buffer | undefined = fs.readFileSync('.env');
        const config = dotenv.parse(file);
        this.envConfig = this.validateInput(config);
    }
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            PORT: Joi.number().default(3000),
            KAFKA_BROKER_HOST: Joi.string(),
            MONGO_DSN: Joi.string().required(),
            MONGO_DATABASE:Joi.string().required(),
            MONGO_USER: Joi.string().required(),
            MONGO_PASSWORD: Joi.string().required(),
            MONGO_ROOT_USER: Joi.string().required(),
            MONGO_ROOT_PASSWORD: Joi.string().required(),
        });
        const { error, value: validatedEnvConfig } =
            envVarsSchema.validate(envConfig);
        if (error) {
            Logger.error(`Config validation error in your env file: ${error.message}`);
            throw new Error(`Config validation error in your env file: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get(key: string): string {
        return this.envConfig[key];
    }

}