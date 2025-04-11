import { PUBLIC_APP_ENVIRONMENT } from '$env/static/public';
import { z } from 'zod';

const EnvironmentSchema = z.enum(['dev', 'prod']);

type Environment = z.infer<typeof EnvironmentSchema>;
interface SecurityHeaders {
  'X-Content-Type-Options': string;
  'Cache-Control': string;
  Pragma: string;
  'Strict-Transport-Security'?: string;
}

const parseEnvironment = (): Environment => {
  try {
    return EnvironmentSchema.parse(PUBLIC_APP_ENVIRONMENT);
  } catch (error) {
    console.warn(
      `Invalid environment value: "${PUBLIC_APP_ENVIRONMENT}". Defaulting to "development"`
    );
    return 'dev';
  }
};

export function getSecurityHeaders(): SecurityHeaders {
  const environment = parseEnvironment();
  const headers: SecurityHeaders = {
    /**
     * X-Content-Type-Options: nosniff
     * Prevents browsers from interpreting files as a different MIME type
     * than what is specified in the Content-Type header
     */
    'X-Content-Type-Options': 'nosniff',

    /**
     * Cache-Control: no-store, no-cache, must-revalidate
     * Prevents browsers from caching sensitive response data
     * - no-store: Browser shouldn't store any part of the request or response
     * - no-cache: Must validate cached response with server before using it
     * - must-revalidate: Once response becomes stale, don't use it without validation
     */
    'Cache-Control': 'no-store, no-cache, must-revalidate',

    /**
     * Pragma: no-cache
     * HTTP/1.0 legacy header that ensures compatibility with older browsers
     * Works alongside Cache-Control to prevent caching
     */
    Pragma: 'no-cache'
  };
  if (environment === 'prod') {
    /**
     * Strict-Transport-Security
     * Only applied in production to avoid issues with HTTP development servers
     * - max-age=31536000: Browsers should remember this rule for 1 year
     * - includeSubDomains: Apply rule to all subdomains for complete protection
     */
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
  }

  return headers;
}
