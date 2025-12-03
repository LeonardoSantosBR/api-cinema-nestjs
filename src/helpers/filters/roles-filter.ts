import { whereGlobal } from 'src/helpers';
import { optType } from 'src/types/type-filter';
import { querySearchRoles } from 'src/modules/roles/dto/query-search-roles';

export const roles_filter = (query: querySearchRoles) => {
  const opt: any = {
    name: {
      value: query?.search,
      type: optType.stringLike,
      path: 'name',
    }
  };

  return whereGlobal(opt);
};
