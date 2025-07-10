import { whereGlobal } from 'src/helpers';
import { optType } from 'src/types/type-filter';
import { querySearchSessions } from 'src/modules/sessions/dto/query-search-sessions';

export const sessionsFilter = (query: querySearchSessions) => {
  const opt: any = {};

  return whereGlobal(opt);
};
