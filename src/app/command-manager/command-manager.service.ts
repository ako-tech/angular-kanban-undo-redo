import { Injectable } from '@angular/core';
import { Command } from '.';

@Injectable()
export class CommandManagerService {
  private doneCommandsStack: Command[] = [];
  private undoneCommandsStack: Command[] = [];

  get canUndo(): boolean {
    return this.doneCommandsStack.length > 0;
  }
  get canRedo(): boolean {
    return this.undoneCommandsStack.length > 0;
  }

  execute(command: Command): void {
    command.execute();

    this.doneCommandsStack.push(command);

    this.resetUndoneStack();
  }

  undo(): void {
    if (this.doneCommandsStack.length === 0) {
      return;
    }

    const lastDoneCommand = this.doneCommandsStack.pop()!;
    lastDoneCommand.undo();

    this.undoneCommandsStack.push(lastDoneCommand);
  }

  redo(): void {
    if (this.undoneCommandsStack.length === 0) {
      return;
    }

    const lastUndoneCommand = this.undoneCommandsStack.pop()!;
    lastUndoneCommand.execute();

    this.doneCommandsStack.push(lastUndoneCommand);
  }

  private resetUndoneStack(): void {
    this.undoneCommandsStack = [];
  }
}
