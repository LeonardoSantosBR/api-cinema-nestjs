import { whereGlobal } from 'src/helpers';
import { optType } from 'src/types/type-filter';
import { querySearchMovies } from 'src/modules/movies/dto/query-search-movies';

export const sessionSeatsFilter = (query: querySearchMovies) => {
  const opt: any = {
    seat_number: {
      value: query?.search,
      type: optType.stringLike,
      path: 'seat.seat_number',
    },
  };

  return whereGlobal(opt);
};
