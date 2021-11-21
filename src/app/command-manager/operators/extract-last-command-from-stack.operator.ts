import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Command,
  CommandManagerStackType,
  CommandManagerState,
} from '../interfaces';

export const extractLastCommandFromStack =
  (stack: CommandManagerStackType) =>
  (
    obs: Observable<CommandManagerState>
  ): Observable<[Command | null, CommandManagerState]> => {
    return obs.pipe(
      map((state) => {
        const fromStack = state[stack];
        const fromStackLength = fromStack.length;

        if (fromStackLength === 0) {
          return [null, state];
        }

        const lastCommand = fromStack[fromStackLength - 1];
        const newState = {
          ...state,
          [stack]: fromStack.slice(0, fromStackLength - 1),
        };

        return [lastCommand, newState];
      })
    );
  };
