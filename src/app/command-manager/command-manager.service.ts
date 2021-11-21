import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  merge,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { Command, CommandManagerState } from '.';
import {
  addCommandToStack,
  clearUndoneStack,
  executeCommand,
  extractLastCommandFromStack,
  stackIsNotEmpty,
  undoCommand,
} from './operators';

@Injectable()
export class CommandManagerService implements OnDestroy {
  private state$ = new BehaviorSubject<CommandManagerState>({
    doneCommandsStack: [],
    undoneCommandsStack: [],
  });

  private execute$ = new Subject<Command>();
  private undo$ = new Subject();
  private redo$ = new Subject();

  private executePipeline$: Observable<CommandManagerState> =
    this.execute$.pipe(
      withLatestFrom(this.state$),
      executeCommand,
      addCommandToStack('doneCommandsStack'),
      clearUndoneStack
    );

  private undoPipeline$: Observable<CommandManagerState> = this.undo$.pipe(
    withLatestFrom(this.state$, (_, state) => state),
    extractLastCommandFromStack('doneCommandsStack'),
    undoCommand,
    addCommandToStack('undoneCommandsStack')
  );

  private redoPipeline$: Observable<CommandManagerState> = this.redo$.pipe(
    withLatestFrom(this.state$, (_, state) => state),
    extractLastCommandFromStack('undoneCommandsStack'),
    executeCommand,
    addCommandToStack('doneCommandsStack')
  );

  private subscription: Subscription;

  canUndo$: Observable<boolean> = this.state$.pipe(
    stackIsNotEmpty('doneCommandsStack')
  );

  canRedo$: Observable<boolean> = this.state$.pipe(
    stackIsNotEmpty('undoneCommandsStack')
  );

  constructor() {
    this.subscription = merge(
      this.executePipeline$,
      this.undoPipeline$,
      this.redoPipeline$
    ).subscribe((newState) => this.state$.next(newState));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  execute(command: Command): void {
    this.execute$.next(command);
  }

  undo(): void {
    this.undo$.next();
  }

  redo(): void {
    this.redo$.next();
  }
}
