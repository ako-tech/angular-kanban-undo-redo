import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommandManagerState } from '../interfaces';

export function clearUndoneStack(
  obs: Observable<CommandManagerState>
): Observable<CommandManagerState> {
  return obs.pipe(
    map((state) => {
      return {
        ...state,
        undoneCommandsStack: [],
      };
    })
  );
}
