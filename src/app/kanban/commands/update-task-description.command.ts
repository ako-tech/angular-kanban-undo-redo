import { Command } from '../../command-manager';
import { KanbanTask } from '../model';

export class UpdateTaskDescriptionCommand implements Command {
  private previousLabel: string;

  constructor(private task: KanbanTask, private newDescription: string) {
    this.previousLabel = task.description;
  }

  execute() {
    this.task.description = this.newDescription;
  }

  undo() {
    this.task.description = this.previousLabel;
  }
}
