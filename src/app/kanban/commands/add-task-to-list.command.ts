import { Command } from '../../command-manager';
import { KanbanList, KanbanTaskFactory } from '../model';

export class AddTaskToListCommand implements Command {
  constructor(private list: KanbanList) {}

  execute() {
    this.list.tasks.push(KanbanTaskFactory.createDefault());
  }

  undo() {
    this.list.tasks.pop();
  }
}
