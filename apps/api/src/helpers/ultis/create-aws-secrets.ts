import {
  SecretsManagerClient,
  CreateSecretCommand,
  UpdateSecretCommand,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const createAwsSecrets = async () => {
  const client = new SecretsManagerClient({ region: process.env.AWS_REGION });

  const secretName = process.env.AWS_SECRETS_NAME;
  if (!secretName) {
    throw new Error('AWS_SECRETS_NAME is not defined');
  }

  const envContent = fs.readFileSync('.env', 'utf-8');
  const envValues = dotenv.parse(envContent);

  // Remove AWS credentials from the secrets (these should be managed separately)
  delete envValues.AWS_ACCESS_KEY_ID;
  delete envValues.AWS_SECRET_ACCESS_KEY;
  delete envValues.AWS_REGION;
  delete envValues.AWS_SECRETS_NAME;

  const secretString = JSON.stringify(envValues);

  try {
    // Check if the secret already exists
    try {
      await client.send(new GetSecretValueCommand({ SecretId: secretName }));

      // If the secret exists, update it
      await client.send(
        new UpdateSecretCommand({
          SecretId: secretName,
          SecretString: secretString,
        }),
      );
      console.log(`Secret ${secretName} updated successfully.`);
    } catch (error) {
      // If the secret doesn't exist, create it
      await client.send(
        new CreateSecretCommand({
          Name: secretName,
          Description: 'Application environment variables',
          SecretString: secretString,
        }),
      );
      console.log(`Secret ${secretName} created successfully.`);
    }
  } catch (error) {
    console.error('Error creating/updating secret:', error);
  }
};

createAwsSecrets().catch(console.error);
