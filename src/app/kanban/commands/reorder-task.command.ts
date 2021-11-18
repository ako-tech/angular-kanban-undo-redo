import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Command } from '../../command-manager';
import { KanbanList } from '../model';

export class ReorderTaskCommand implements Command {
  constructor(
    private list: KanbanList,
    private fromIndex: number,
    private toIndex: number
  ) {}

  execute() {
    moveItemInArray(this.list.tasks, this.fromIndex, this.toIndex);
  }

  undo() {
    moveItemInArray(this.list.tasks, this.toIndex, this.fromIndex);
  }
}
