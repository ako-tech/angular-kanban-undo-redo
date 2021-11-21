import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandManagerService } from '../../command-manager';

import { KanbanStateService } from '../kanban-state.service';
import { KanbanBoard, KanbanList, KanbanTask } from '../model';

@Component({
  selector: 'ako-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  providers: [KanbanStateService, CommandManagerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  board$: Observable<KanbanBoard> = this.kanbanService.board$;

  constructor(private kanbanService: KanbanStateService) {}

  trackById(index: number, element: KanbanList | KanbanTask): number {
    return element.id;
  }

  addTaskToList(listIndex: number): void {
    this.kanbanService.addTaskToList(listIndex);
  }

  updateTitleInList(listIndex: number, newTitle: string): void {
    this.kanbanService.updateListTitle(listIndex, newTitle);
  }

  removeList(listIndex: number): void {
    this.kanbanService.removeList(listIndex);
  }

  moveList(dropEvent: CdkDragDrop<undefined>): void {
    const { previousIndex, currentIndex } = dropEvent;

    if (previousIndex === currentIndex) {
      return;
    }

    this.kanbanService.moveList(previousIndex, currentIndex);
  }

  removeTaskFromList(listIndex: number, taskIndex: number): void {
    this.kanbanService.removeTaskFromList(listIndex, taskIndex);
  }

  updateTaskDescription(
    listIndex: number,
    taskIndex: number,
    newDescription: string
  ): void {
    this.kanbanService.updateTask(listIndex, taskIndex, newDescription);
  }

  moveTask(dropEvent: CdkDragDrop<number>): void {
    const { previousContainer, container, previousIndex, currentIndex } =
      dropEvent;
    const isSameContainer = previousContainer === container;

    if (isSameContainer && previousIndex === currentIndex) {
      return;
    }

    isSameContainer
      ? this.kanbanService.reorderTask(
          container.data,
          previousIndex,
          currentIndex
        )
      : this.kanbanService.transferTask({
          fromListIndex: previousContainer.data,
          toListIndex: container.data,
          fromIndex: previousIndex,
          toIndex: currentIndex,
        });
  }
}
