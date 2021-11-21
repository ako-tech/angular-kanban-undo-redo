import { BehaviorSubject } from 'rxjs';
import { KanbanBoard, KanbanList } from '../model';
import { AbstractBoardCommand } from './abstract-board.command';

export class RemoveListCommand extends AbstractBoardCommand {
  listRemoved: KanbanList;

  constructor(
    board: BehaviorSubject<KanbanBoard>,
    private listToRemoveIndex: number
  ) {
    super(board);
    this.listRemoved = board.value.lists[listToRemoveIndex];
  }

  protected doCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const newLists = [
      ...currentBoardValue.lists.slice(0, this.listToRemoveIndex),
      ...currentBoardValue.lists.slice(this.listToRemoveIndex + 1),
    ];

    return {
      ...currentBoardValue,
      lists: newLists,
    };
  }

  protected undoCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const newLists = [
      ...currentBoardValue.lists.slice(0, this.listToRemoveIndex),
      this.listRemoved,
      ...currentBoardValue.lists.slice(this.listToRemoveIndex),
    ];

    return {
      ...currentBoardValue,
      lists: newLists,
    };
  }
}
