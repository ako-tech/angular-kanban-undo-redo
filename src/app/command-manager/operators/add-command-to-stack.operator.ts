import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Command,
  CommandManagerStackType,
  CommandManagerState,
} from '../interfaces';

export const addCommandToStack =
  (stack: CommandManagerStackType) =>
  (
    obs: Observable<[Command | null, CommandManagerState]>
  ): Observable<CommandManagerState> => {
    return obs.pipe(
      map(([command, state]) => {
        return command === null
          ? state
          : {
              ...state,
              [stack]: [...state[stack], command],
            };
      })
    );
  };
