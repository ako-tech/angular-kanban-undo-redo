import { transferArrayItem } from '@angular/cdk/drag-drop';
import { Command } from '../../command-manager';
import { TransferTaskData } from '../common/transfer-task-data.interface';

export class TransferTaskCommand implements Command {
  constructor(private transferTaskData: TransferTaskData) {}

  execute() {
    const { fromList, toList, fromIndex, toIndex } = this.transferTaskData;
    transferArrayItem(fromList.tasks, toList.tasks, fromIndex, toIndex);
  }

  undo() {
    const { fromList, toList, fromIndex, toIndex } = this.transferTaskData;
    transferArrayItem(toList.tasks, fromList.tasks, toIndex, fromIndex);
  }
}
