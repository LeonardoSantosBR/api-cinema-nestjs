import { whereGlobal } from 'src/helpers';
import { optType } from 'src/types/type-filter';
import { querySearchAdmin } from 'src/modules/admins/dto/query-search-admin';

export const admins_filter = (query: querySearchAdmin) => {
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
