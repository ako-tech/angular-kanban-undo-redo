import { Command } from './command.interface';

export interface CommandManagerState {
  doneCommandsStack: Command[];
  undoneCommandsStack: Command[];
}
