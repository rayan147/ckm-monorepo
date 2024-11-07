// jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { EnvService } from 'src/env/env.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService, envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('JWT_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const getSessionToken = (req: any): O.Option<string> =>
      O.fromNullable(req.headers['authorization']?.split(' ')[1]);

    const findUserToken = TE.tryCatchK(
      (sessionToken: any) =>
        this.prisma.session.findUnique({
          where: { token: sessionToken },
          include: { user: true },
        }),
      E.toError,
    );

    return pipe(
      getSessionToken(req),
      O.getOrElseW(() => {
        throw new UnauthorizedException('Session token is missing');
      }),
      findUserToken,
      TE.flatMap(
        TE.fromNullable(
          new NotFoundException('User session not found in database'),
        ),
      ),
      TE.map((dbUser) => {
        const isValidSession =
          dbUser.userId !== payload.sub || dbUser.expiresAt < new Date();
        return isValidSession;
      }),
      TE.chainW(
        TE.fromPredicate(
          (isValidSession) => isValidSession,
          () => new UnauthorizedException('No valid session'),
        ),
      ),
    )();
  }
}
