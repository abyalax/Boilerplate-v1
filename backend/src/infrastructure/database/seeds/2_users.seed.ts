import type { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { Permission } from '~/modules/auth/entity/permission.entity';
import { Role } from '~/modules/auth/entity/role.entity';
import { User } from '~/modules/user/user.entity';

import { mockPermissions } from '../mock/permission.mock';
import { mockRolePermissions } from '../mock/role-permission.mock';
import { mockRoles } from '../mock/role.mock';
import { mockUserRoles } from '../mock/user-role.mock';
import { mockUser } from '../mock/user.mock';

export default class UserSeeder implements Seeder {
  track = true;
  public async run(dataSource: DataSource): Promise<void> {
    const userRepo = dataSource.getRepository(User);
    const roleRepo = dataSource.getRepository(Role);
    const permRepo = dataSource.getRepository(Permission);

    const dataUser = await mockUser();

    await userRepo.insert(dataUser);
    console.log('✅ Seeded: users successfully');

    await roleRepo.insert(mockRoles);
    console.log('✅ Seeded: roles successfully');

    await permRepo.insert(mockPermissions);
    console.log('✅ Seeded: permissions successfully');

    for (const { id_role, id_permission } of mockRolePermissions) {
      await dataSource.query('INSERT INTO role_permissions (id_role, id_permission) VALUES (?, ?)', [id_role, id_permission]);
    }

    console.log('✅ Seeded: role_permissions successfully');

    for (const { id_user, id_role } of mockUserRoles) {
      await dataSource.query('INSERT INTO user_roles (id_user, id_role) VALUES (?, ?)', [id_user, id_role]);
    }
    console.log('✅ Seeded: user_roles successfully');
  }
}
