import { whereGlobal } from 'src/helpers';
import { optType } from 'src/types/type-filter';
import { querySearchSessions } from 'src/modules/sessions/dto/query-search-sessions';

export const sessions_filter = (query: querySearchSessions) => {
  const opt: any = {
    movie_name: {
      value: query?.search,
      type: optType.stringLike,
      path: 'movie.name',
    },
    room_name: {
      value: query?.search,
      type: optType.stringLike,
      path: 'room.name',
    },
    cinema_name: {
      value: query?.search,
      type: optType.stringLike,
      path: 'room.cinema.name',
    },
  };

  return whereGlobal(opt);
};
