"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const createAwsSecrets = async () => {
    const client = new client_secrets_manager_1.SecretsManagerClient({ region: process.env.AWS_REGION });
    const secretName = process.env.AWS_SECRETS_NAME;
    if (!secretName) {
        throw new Error('AWS_SECRETS_NAME is not defined');
    }
    const envContent = fs_1.default.readFileSync('.env', 'utf-8');
    const envValues = dotenv_1.default.parse(envContent);
    delete envValues.AWS_ACCESS_KEY_ID;
    delete envValues.AWS_SECRET_ACCESS_KEY;
    delete envValues.AWS_REGION;
    delete envValues.AWS_SECRETS_NAME;
    const secretString = JSON.stringify(envValues);
    try {
        try {
            await client.send(new client_secrets_manager_1.GetSecretValueCommand({ SecretId: secretName }));
            await client.send(new client_secrets_manager_1.UpdateSecretCommand({
                SecretId: secretName,
                SecretString: secretString,
            }));
            console.log(`Secret ${secretName} updated successfully.`);
        }
        catch (error) {
            await client.send(new client_secrets_manager_1.CreateSecretCommand({
                Name: secretName,
                Description: 'Application environment variables',
                SecretString: secretString,
            }));
            console.log(`Secret ${secretName} created successfully.`);
        }
    }
    catch (error) {
        console.error('Error creating/updating secret:', error);
    }
};
createAwsSecrets().catch(console.error);
//# sourceMappingURL=create-aws-secrets.js.map