import { transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';

import { KanbanBoard } from '../model';
import { AbstractBoardCommand } from './abstract-board.command';
import { TransferTaskData } from '../common/transfer-task-data.interface';

export class TransferTaskCommand extends AbstractBoardCommand {
  constructor(
    board: BehaviorSubject<KanbanBoard>,
    private transferData: TransferTaskData
  ) {
    super(board);
  }

  protected doCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const { fromListIndex, toListIndex, fromIndex, toIndex } =
      this.transferData;
    const listsClone = [...currentBoardValue.lists];
    const fromTasksClone = [...listsClone[fromListIndex].tasks];
    const toTasksClone = [...listsClone[toListIndex].tasks];

    transferArrayItem(fromTasksClone, toTasksClone, fromIndex, toIndex);

    listsClone[fromListIndex] = {
      ...listsClone[fromListIndex],
      tasks: fromTasksClone,
    };
    listsClone[toListIndex] = {
      ...listsClone[toListIndex],
      tasks: toTasksClone,
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }

  protected undoCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const { fromListIndex, toListIndex, fromIndex, toIndex } =
      this.transferData;
    const listsClone = [...currentBoardValue.lists];
    const fromTasksClone = [...listsClone[fromListIndex].tasks];
    const toTasksClone = [...listsClone[toListIndex].tasks];

    transferArrayItem(toTasksClone, fromTasksClone, toIndex, fromIndex);

    listsClone[fromListIndex] = {
      ...listsClone[fromListIndex],
      tasks: fromTasksClone,
    };
    listsClone[toListIndex] = {
      ...listsClone[toListIndex],
      tasks: toTasksClone,
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
}
