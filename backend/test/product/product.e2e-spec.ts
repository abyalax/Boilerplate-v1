import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker/.';

import * as request from 'supertest';
import { App } from 'supertest/types';

import { EProductStatus } from '~/modules/product/product.schema';
import { ProductDto } from '~/modules/product/dto/product.dto';
import { extractHttpOnlyCookie } from '~/test/utils';
import { setupApplication } from '~/test/setup_e2e';
import { validateDto } from '~/common/helper/validation';
import { USER } from '~/test/common/constant';

describe('Product Module', () => {
  let app: INestApplication<App>;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    [app, moduleFixture] = await setupApplication();
  });

  describe('Response Success', () => {
    let access_token: string;
    let refresh_token: string;
    let ids: number[] = [];
    let newProduct: ProductDto | undefined = undefined;

    beforeEach(async () => {
      const credentials = {
        email: USER.LOGIN.email,
        password: USER.LOGIN.password,
      };
      const res = await request(app.getHttpServer()).post('/auth/login').send(credentials);

      expect(res.headers['set-cookie']).toBeDefined();
      const cookies = res.headers['set-cookie'];
      access_token = extractHttpOnlyCookie('access_token', cookies) ?? '';
      refresh_token = extractHttpOnlyCookie('refresh_token', cookies) ?? '';

      await request(app.getHttpServer())
        .get('/products/ids')
        .set('Cookie', `access_token=s%3A${encodeURIComponent(access_token)}`)
        .expect(200)
        .expect((res) => {
          ids = res.body.data;
        });
    });

    test('Test Token Cookie for Request', async () => {
      expect(refresh_token).toBeDefined();
      expect(access_token).toBeDefined();

      const max = ids.length;
      const id = ids[Math.floor(Math.random() * max)];

      await request(app.getHttpServer())
        .get('/products/' + id)
        .set('Cookie', `access_token=s%3A${encodeURIComponent(access_token)}`)
        .expect(200);
    });

    test('GET /products', async () => {
      const res = await request(app.getHttpServer())
        .get('/products')
        .set('Cookie', `access_token=s%3A${encodeURIComponent(access_token)}`);
      const items = await res.body.data.data;
      const item = items[0];
      const result = await validateDto(ProductDto, item);
      expect(result).toBeInstanceOf(ProductDto);
      const meta = await res.body.data.meta;
      expect(meta).toEqual(
        expect.objectContaining({
          page: expect.any(Number),
          per_page: expect.any(Number),
          total_count: expect.any(Number),
          total_pages: expect.any(Number),
        }),
      );
    });

    test('GET /products/:id', async () => {
      const max = ids.length;
      const id = ids[Math.floor(Math.random() * max)];
      const res = await request(app.getHttpServer())
        .get('/products/' + id)
        .set('Cookie', `access_token=s%3A${encodeURIComponent(access_token)}`)
        .expect(200);

      const validData = await res.body.data;
      const result = await validateDto(ProductDto, validData);
      expect(result).toBeInstanceOf(ProductDto);
    });

    test('POST /products', async () => {
      let category: string = '';
      const max = ids.length;
      const id = ids[Math.floor(Math.random() * max)];
      await request(app.getHttpServer())
        .get('/products/' + id)
        .set('Cookie', `access_token=s%3A${encodeURIComponent(access_token)}`)
        .expect(200)
        .expect((res) => {
          category = res.body.data.category.name;
          return res;
        });

      const product = {
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 5000, max: 1000000 }).toString(),
        status: EProductStatus.AVAILABLE,
        stock: faker.number.int({ min: 0, max: 300 }),
        category,
      };
      const res = await request(app.getHttpServer())
        .post('/products')
        .set('Cookie', `access_token=s%3A${encodeURIComponent(access_token)}`)
        .send(product);

      const validData = await res.body.data;
      const result = await validateDto(ProductDto, validData);
      expect(result).toBeInstanceOf(ProductDto);
      newProduct = await res.body.data;
    });

    test('PATCH /products/:id', async () => {
      let category: string = '';
      const id = newProduct?.id;
      if (!id) {
        console.log('ID Product not found');
        return;
      }
      const fetchProductByID = await request(app.getHttpServer())
        .get('/products/' + id)
        .set('Cookie', `access_token=s%3A${encodeURIComponent(access_token)}`)
        .expect(200);
      category = fetchProductByID.body.data.category.name;

      const product = {
        id,
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 5000, max: 1000000 }).toString(),
        status: EProductStatus.AVAILABLE,
        stock: faker.number.int({ min: 0, max: 300 }),
        category,
      };
      await request(app.getHttpServer())
        .patch('/products/' + id)
        .set('Cookie', `access_token=s%3A${encodeURIComponent(access_token)}`)
        .send(product)
        .expect(HttpStatus.NO_CONTENT);
    });

    test('DELETE /products/:id', async () => {
      const id = newProduct?.id;
      if (!id) {
        console.log('ID Product not found');
        return;
      }
      await request(app.getHttpServer())
        .delete(`/products/${id}`)
        .set('Cookie', `access_token=s%3A${encodeURIComponent(access_token)}`)
        .expect(HttpStatus.NO_CONTENT);
    });
  });

  afterAll(async () => {
    await app.close();
    await moduleFixture.close();
  });
});
