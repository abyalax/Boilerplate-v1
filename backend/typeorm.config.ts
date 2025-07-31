import { DataSource } from 'typeorm';
import { Permission } from '~/modules/auth/entity/permission.entity';
import { Role } from '~/modules/auth/entity/role.entity';
import { Category } from '~/modules/product/entity/category.entity';
import { Product } from '~/modules/product/entity/product.entity';
import { User } from '~/modules/user/user.entity';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'db_boilerplate_v1',
  entities: [Category, Product, User, Role, Permission],
  migrations: ['./src/infrastructure/database/migrations/*.ts'],
  synchronize: false,
});
