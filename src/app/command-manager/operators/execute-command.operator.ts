import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Command, CommandManagerState } from '../interfaces';

export function executeCommand(
  obs: Observable<[Command | null, CommandManagerState]>
): Observable<[Command | null, CommandManagerState]> {
  return obs.pipe(tap(([command, _]) => command?.execute()));
}
