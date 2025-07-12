import { whereGlobal } from 'src/helpers';
import { optType } from 'src/types/type-filter';
import { querySearchUser } from 'src/modules/users/dto/query-search-user';

export const users_filter = (query: querySearchUser) => {
  const opt: any = {
    name: {
      value: query?.search,
      type: optType.stringLike,
      path: 'name',
    },
    cpf: {
      value: query?.search,
      type: optType.stringLike,
      path: 'cpf',
    },
  };

  return whereGlobal(opt);
};
