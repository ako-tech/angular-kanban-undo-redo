import { Injectable } from '@angular/core';

import {
  dummyBoard,
  KanbanBoard,
  KanbanList,
  KanbanTask,
  KanbanTaskFactory,
} from './model';

@Injectable()
export class KanbanStateService {
  public board: KanbanBoard = dummyBoard;

  constructor() {}

  updateListTitle(list: KanbanList, newTitle: string): void {
    list.title = newTitle;
  }

  removeList(listToRemove: KanbanList): void {
    this.board.lists = this.board.lists.filter((list) => list !== listToRemove);
  }

  addTaskToList(list: KanbanList): void {
    list.tasks.push(KanbanTaskFactory.createDefault());
  }

  removeTaskFromList(list: KanbanList, taskIndex: number): void {
    list.tasks.splice(taskIndex, 1);
  }

  updateTask(task: KanbanTask, newDescription: string): void {
    task.description = newDescription;
  }
}
