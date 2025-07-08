import { whereGlobal } from 'src/helpers';
import { optType } from 'src/types/type-filter';
import { querySearchCinemas } from 'src/modules/cinemas/dto/query-search-cinema';

export const cinemasFilter = (query: querySearchCinemas) => {
  const opt: any = {
    name: {
      value: query?.search,
      type: optType.stringLike,
      path: 'name',
    },
    location: {
      value: query?.search,
      type: optType.stringLike,
      path: 'location',
    },
  };

  return whereGlobal(opt);
};
