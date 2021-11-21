import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ako-kanban-list-tasks-wrapper',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        width: 100%;
        min-height: 50px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanListTasksWrapperComponent {
  constructor() {}
}
