import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Command } from '../../command-manager';
import { KanbanList } from '../model';

export class ReorderListCommand implements Command {
  constructor(
    private lists: KanbanList[],
    private fromIndex: number,
    private toIndex: number
  ) {}

  execute(): void {
    moveItemInArray(this.lists, this.fromIndex, this.toIndex);
  }

  undo(): void {
    moveItemInArray(this.lists, this.toIndex, this.fromIndex);
  }
}
