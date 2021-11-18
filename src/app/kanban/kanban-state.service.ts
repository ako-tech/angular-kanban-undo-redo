import { Injectable } from '@angular/core';
import { CommandManagerService } from '../command-manager';
import {
  AddTaskToListCommand,
  RemoveListCommand,
  RemoveTaskFromListCommand,
  ReorderListCommand,
  ReorderTaskCommand,
  TransferTaskCommand,
  UpdateListTitleCommand,
  UpdateTaskDescriptionCommand,
} from './commands';
import { TransferTaskData } from './common';

import { dummyBoard, KanbanBoard, KanbanList, KanbanTask } from './model';

@Injectable()
export class KanbanStateService {
  public board: KanbanBoard = dummyBoard;

  constructor(private commandManager: CommandManagerService) {}

  updateListTitle(list: KanbanList, newTitle: string): void {
    this.commandManager.execute(new UpdateListTitleCommand(list, newTitle));
  }

  moveList(fromIndex: number, toIndex: number): void {
    this.commandManager.execute(
      new ReorderListCommand(this.board.lists, fromIndex, toIndex)
    );
  }

  removeList(listToRemove: KanbanList): void {
    this.commandManager.execute(
      new RemoveListCommand(this.board, listToRemove)
    );
  }

  addTaskToList(list: KanbanList): void {
    this.commandManager.execute(new AddTaskToListCommand(list));
  }

  removeTaskFromList(list: KanbanList, taskIndex: number): void {
    this.commandManager.execute(new RemoveTaskFromListCommand(list, taskIndex));
  }

  updateTask(task: KanbanTask, newDescription: string): void {
    this.commandManager.execute(
      new UpdateTaskDescriptionCommand(task, newDescription)
    );
  }

  reorderTask(list: KanbanList, fromIndex: number, toIndex: number): void {
    this.commandManager.execute(
      new ReorderTaskCommand(list, fromIndex, toIndex)
    );
  }

  transferTask(transferData: TransferTaskData): void {
    this.commandManager.execute(new TransferTaskCommand(transferData));
  }
}
