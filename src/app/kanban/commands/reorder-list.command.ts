import { moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { KanbanBoard } from '../model';
import { AbstractBoardCommand } from './abstract-board.command';

export class ReorderListCommand extends AbstractBoardCommand {
  constructor(
    board: BehaviorSubject<KanbanBoard>,
    private fromIndex: number,
    private toIndex: number
  ) {
    super(board);
  }

  protected doCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    moveItemInArray(listsClone, this.fromIndex, this.toIndex);

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
  protected undoCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    moveItemInArray(listsClone, this.toIndex, this.fromIndex);

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
}
