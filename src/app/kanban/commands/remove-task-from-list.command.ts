import { BehaviorSubject } from 'rxjs';
import { KanbanBoard, KanbanTask } from '../model';
import { AbstractBoardCommand } from './abstract-board.command';

export class RemoveTaskFromListCommand extends AbstractBoardCommand {
  private taskRemoved: KanbanTask;

  constructor(
    board: BehaviorSubject<KanbanBoard>,
    private listIndex: number,
    private taskIndex: number
  ) {
    super(board);
    this.taskRemoved = board.value.lists[listIndex].tasks[taskIndex];
  }

  protected doCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    const originalList = listsClone[this.listIndex];

    listsClone[this.listIndex] = {
      ...originalList,
      tasks: [
        ...originalList.tasks.slice(0, this.taskIndex),
        ...originalList.tasks.slice(this.taskIndex + 1),
      ],
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
  protected undoCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    const originalList = listsClone[this.listIndex];

    listsClone[this.listIndex] = {
      ...originalList,
      tasks: [
        ...originalList.tasks.slice(0, this.taskIndex),
        this.taskRemoved,
        ...originalList.tasks.slice(this.taskIndex),
      ],
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
}
