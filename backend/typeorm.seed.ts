import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Product } from '~/modules/product/entity/product.entity';
import { User } from '~/modules/user/user.entity';
import { Role } from '~/modules/auth/entity/role.entity';
import { Permission } from '~/modules/auth/entity/permission.entity';
import { Category } from '~/modules/product/entity/category.entity';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'db_boilerplate_v1',
  entities: [Category, Product, User, Role, Permission],
  synchronize: false,
  seeds: ['./src/infrastructure/database/seeds/*.seed.ts'],
};

export const dataSource = new DataSource(dataSourceOptions);
