import { Product } from '~/modules/product/entity/product.entity';
import { Permission } from '~/modules/auth/entity/permission.entity';
import { Category } from '~/modules/product/entity/category.entity';
import { TDatabaseConfig } from '~/config/database.config';
import { Role } from '~/modules/auth/entity/role.entity';
import { User } from '~/modules/user/user.entity';

import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const MySQLConnection = {
  provide: 'mysql_connection',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const database = configService.get<TDatabaseConfig>('database')!;
    const dataSource = new DataSource({
      type: 'mysql',
      host: database.host,
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.database,
      dateStrings: true,
      entities: [Category, Product, User, Role, Permission],
      synchronize: false,
    });
    return dataSource.initialize();
  },
};

export const createDatabaseProviders = (provide: string, options: DataSourceOptions) => {
  return [
    {
      provide,
      useFactory: async () => {
        const dataSource = new DataSource(options);
        return dataSource.initialize();
      },
    },
  ];
};
