import { whereGlobal } from 'src/helpers';
import { optType } from 'src/types/type-filter';
import { querySearchMovies } from 'src/modules/cinemas/dto/query-search-movies';

export const moviesFilter = (query: querySearchMovies) => {
  const opt: any = {
    name: {
      value: query?.search,
      type: optType.stringLike,
      path: 'name',
    },
    synopsis: {
      value: query?.search,
      type: optType.stringLike,
      path: 'synopsis',
    },
  };

  return whereGlobal(opt);
};
