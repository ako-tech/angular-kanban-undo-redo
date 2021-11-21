import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommandManagerStackType, CommandManagerState } from '..';

export const stackIsNotEmpty =
  (stack: CommandManagerStackType) =>
  (obs: Observable<CommandManagerState>): Observable<boolean> =>
    obs.pipe(map((state) => state[stack].length > 0));
