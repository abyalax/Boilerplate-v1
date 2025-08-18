import { DataSourceOptions } from 'typeorm';

import { Product } from '~/modules/product/entity/product.entity';
import { Permission } from '~/modules/auth/entity/permission.entity';
import { Category } from '~/modules/product/entity/category.entity';
import { Role } from '~/modules/auth/entity/role.entity';
import { User } from '~/modules/user/user.entity';
import { configDotenv } from 'dotenv';

configDotenv();

type TDatabaseCollection = 'MYSQL';

type TDatabaseOptions = {
  [K in TDatabaseCollection]: {
    PROVIDE: string;
    OPTIONS: DataSourceOptions;
  };
};

export const REPOSITORY = {
  PRODUCT: 'product_repository',
  USER: 'user_repository',
  PERMISSION: 'permission_repository',
  ROLE: 'role_repository',
  CATEGORY: 'category_repository',
};

export const DATABASE: TDatabaseOptions = {
  MYSQL: {
    PROVIDE: 'mysql_connection',
    OPTIONS: {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      dateStrings: false,
      entities: [Category, Product, User, Role, Permission],
      synchronize: false,
    },
  },
};
