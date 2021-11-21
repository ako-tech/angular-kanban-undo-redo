import { KanbanBoard, KanbanTaskFactory } from '../model';
import { BehaviorSubject } from 'rxjs';
import { AbstractBoardCommand } from './abstract-board.command';

export class AddTaskToListCommand extends AbstractBoardCommand {
  constructor(board: BehaviorSubject<KanbanBoard>, private listIndex: number) {
    super(board);
  }

  protected doCommandReducer(currentBoardValue: KanbanBoard): KanbanBoard {
    const listsClone = [...currentBoardValue.lists];
    const originalList = listsClone[this.listIndex];

    listsClone[this.listIndex] = {
      ...originalList,
      tasks: [...originalList.tasks, KanbanTaskFactory.createDefault()],
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
      tasks: originalList.tasks.slice(0, -1),
    };

    return {
      ...currentBoardValue,
      lists: listsClone,
    };
  }
}
