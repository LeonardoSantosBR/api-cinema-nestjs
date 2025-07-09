import { whereGlobal } from 'src/helpers';
import { optType } from 'src/types/type-filter';
import { querySearchRooms } from 'src/modules/rooms/dto/query-search-rooms';

export const roomsFilter = (query: querySearchRooms) => {
  const opt: any = {
    name: {
      value: query?.search,
      type: optType.stringLike,
      path: 'name',
    },
    cinema: {
      value: query?.search,
      type: optType.stringLike,
      path: 'cinema.name',
    },
  };

  return whereGlobal(opt);
};
