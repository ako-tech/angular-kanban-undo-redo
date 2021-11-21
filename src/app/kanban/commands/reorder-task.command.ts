import { moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { KanbanBoard } from '../model';
import { AbstractBoardCommand } from './abstract-board.command';

export class ReorderTaskCommand extends AbstractBoardCommand {
  constructor(
    board: BehaviorSubject<KanbanBoard>,
    private listIndex: number,
    private fromIndex: number,
    private toIndex: number
  ) {
    super(board);
  }

  protected doCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    const tasksClone = [...listsClone[this.listIndex].tasks];

    moveItemInArray(tasksClone, this.fromIndex, this.toIndex);

    listsClone[this.listIndex] = {
      ...listsClone[this.listIndex],
      tasks: tasksClone,
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
  protected undoCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    const tasksClone = [...listsClone[this.listIndex].tasks];

    moveItemInArray(tasksClone, this.toIndex, this.fromIndex);

    listsClone[this.listIndex] = {
      ...listsClone[this.listIndex],
      tasks: tasksClone,
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
}
