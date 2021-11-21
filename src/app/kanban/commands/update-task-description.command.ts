import { BehaviorSubject } from 'rxjs';
import { KanbanBoard } from '../model';
import { AbstractBoardCommand } from './abstract-board.command';

export class UpdateTaskDescriptionCommand extends AbstractBoardCommand {
  private previousDescription: string;

  constructor(
    board: BehaviorSubject<KanbanBoard>,
    private listIndex: number,
    private taskIndex: number,
    private newDescription: string
  ) {
    super(board);
    this.previousDescription =
      board.value.lists[listIndex].tasks[taskIndex].description;
  }

  protected doCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    const originalTask = listsClone[this.listIndex].tasks[this.taskIndex];
    listsClone[this.listIndex].tasks[this.taskIndex] = {
      ...originalTask,
      description: this.newDescription,
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
  protected undoCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    const originalTask = listsClone[this.listIndex].tasks[this.taskIndex];
    listsClone[this.listIndex].tasks[this.taskIndex] = {
      ...originalTask,
      description: this.previousDescription,
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
}
