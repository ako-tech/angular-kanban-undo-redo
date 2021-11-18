import { Command } from '../../command-manager';
import { KanbanList, KanbanTask } from '../model';

export class RemoveTaskFromListCommand implements Command {
  private taskRemoved: KanbanTask;

  constructor(private list: KanbanList, private taskIndex: number) {
    this.taskRemoved = list.tasks[taskIndex];
  }

  execute() {
    this.list.tasks.splice(this.taskIndex, 1);
  }

  undo() {
    this.list.tasks.splice(this.taskIndex, 0, this.taskRemoved);
  }
}
