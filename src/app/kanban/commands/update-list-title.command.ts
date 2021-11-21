import { BehaviorSubject } from 'rxjs';
import { KanbanBoard } from '../model';
import { AbstractBoardCommand } from './abstract-board.command';

export class UpdateListTitleCommand extends AbstractBoardCommand {
  private previousTitle: string;

  constructor(
    board: BehaviorSubject<KanbanBoard>,
    private listIndex: number,
    private newTitle: string
  ) {
    super(board);
    this.previousTitle = board.value.lists[listIndex].title;
  }

  protected doCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    listsClone[this.listIndex] = {
      ...listsClone[this.listIndex],
      title: this.newTitle,
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }

  protected undoCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    listsClone[this.listIndex] = {
      ...listsClone[this.listIndex],
      title: this.previousTitle,
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
}
