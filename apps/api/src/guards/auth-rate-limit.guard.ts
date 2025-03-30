// // src/security/guards/auth-rate-limit.guard.ts
// import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
// import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
// import { Reflector } from '@nestjs/core';
// import { ConfigService } from '@nestjs/config';
//
// @Injectable()
// export class AuthRateLimitGuard extends ThrottlerGuard {
//   private readonly logger = new Logger(AuthRateLimitGuard.name);
//
//   constructor(
//     protected readonly reflector: Reflector,
//     private readonly configService: ConfigService,
//   ) {
//     super(reflector);
//   }
//
//   protected getTracker(context: ExecutionContext): string {
//     const request = context.switchToHttp().getRequest();
//
//     // Get real IP address (works behind proxies)
//     const ip = request.headers['x-forwarded-for']?.split(',')[0].trim() ||
//       request.connection.remoteAddress ||
//       request.ip;
//
//     // Get the route path
//     const path = request.route?.path;
//
//     // If user is authenticated, include user ID in the tracker
//     if (request.user?.id) {
//       return `${ip}-${path}-user:${request.user.id}`;
//     }
//
//     // For unauthenticated requests, if there's an email in the body, include a hash of it
//     if (request.body?.email) {
//       // Don't use the actual email to avoid exposing PII in Redis
//       const emailHash = require('crypto')
//         .createHash('sha256')
//         .update(request.body.email)
//         .digest('hex')
//         .substring(0, 8); // Just use first 8 chars of hash
//
//       return `${ip}-${path}-email:${emailHash}`;
//     }
//
//     // Default tracker
//     return `${ip}-${path}`;
//   }
//
//   protected async handleRequest(
//     context: ExecutionContext,
//     limit: number,
//     ttl: number,
//     throttler: string,
//   ): Promise<boolean> {
//     try {
//       return await super.handleRequest(context, limit, ttl, throttler);
//     } catch (error) {
//       if (error instanceof ThrottlerException) {
//         // Log rate limiting events for security monitoring
//         const request = context.switchToHttp().getRequest();
//         this.logger.warn({
//           message: 'Rate limit exceeded',
//           ip: request.ip,
//           path: request.route?.path,
//           method: request.method,
//           userId: request.user?.id,
//           throttler,
//           limit,
//           ttl,
//         });
//       }
//       throw error;
//     }
//   }
// }
