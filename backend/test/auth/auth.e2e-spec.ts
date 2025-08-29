import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';

import * as request from 'supertest';
import { App } from 'supertest/types';

import { extractHttpOnlyCookie, extractSignedCookieToken } from '../utils';
import { RoleDto } from '~/modules/auth/dto/role/get-role.dto';
import { SignUpDto } from '~/modules/auth/dto/sign-up.dto';
import { setupApplication } from '~/test/setup_e2e';
import { validateDto } from '../../src/common/helper/validation';
import { USER } from '../common/constant';
import { UserDto } from '~/modules/user/dto/user.dto';
import { JwtConfig } from '~/config/jwt.config';
import { ConfigService } from '@nestjs/config';

describe('Module Authentication', () => {
  let app: INestApplication<App>;
  let moduleFixture: TestingModule;
  let jwtService: JwtService;
  let jwt: JwtConfig;

  beforeAll(async () => {
    [app, moduleFixture] = await setupApplication();
    const configService = app.get(ConfigService);
    jwt = configService.get<JwtConfig>('jwt')!;
    jwtService = new JwtService({
      secret: jwt.secret,
      publicKey: jwt.public_key,
      privateKey: jwt.private_key,
    });
  });

  test('POST /auth/login', async () => {
    const credentials = {
      email: USER.LOGIN.email,
      password: USER.LOGIN.password,
    };

    const res = await request(app.getHttpServer()).post('/auth/login').send(credentials).expect(HttpStatus.ACCEPTED);

    expect(res.headers['set-cookie']).toBeDefined();
    const cookies = res.headers['set-cookie'];
    const access_token = extractHttpOnlyCookie('access_token', cookies) ?? '';
    const refresh_token = extractHttpOnlyCookie('refresh_token', cookies) ?? '';

    expect(access_token).toBeDefined();
    expect(refresh_token).toBeDefined();

    const access_token_raw = extractSignedCookieToken(access_token);
    const refresh_token_raw = extractSignedCookieToken(refresh_token);

    expect(() => jwtService.verify(access_token_raw, { secret: jwt.secret }) as unknown).not.toThrow();
    expect(() => jwtService.verify(refresh_token_raw, { secret: jwt.refresh_secret }) as unknown).not.toThrow();

    const payload = jwtService.verify(access_token_raw);
    expect(payload).toHaveProperty('sub');
    expect(payload).toHaveProperty('exp');
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('email');
    expect(payload.email).toEqual(USER.LOGIN.email);

    const data = await res.body.data;
    const validated = await validateDto(UserDto, data);
    expect(validated).toBeInstanceOf(UserDto);
  });

  test('POST /auth/register', async () => {
    const name = faker.person.fullName();
    const [firstName, lastName] = name.toLowerCase().split(' ');
    const email = faker.internet.email({
      firstName,
      lastName,
    });

    const credentials = {
      name,
      email,
      password: USER.LOGIN.password,
    };

    const validated = await validateDto(SignUpDto, credentials);
    const res = await request(app.getHttpServer()).post('/auth/register').send(validated).expect(HttpStatus.CREATED);

    expect(res.body).toEqual(
      expect.objectContaining({
        statusCode: HttpStatus.CREATED,
        data: expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
          roles: expect.arrayContaining<RoleDto>([]),
        }),
      }),
    );
  });

  afterAll(async () => {
    await app.close();
    await moduleFixture.close();
  });
});
