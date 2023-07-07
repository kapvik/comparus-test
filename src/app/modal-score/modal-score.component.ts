import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-modal-score',
  templateUrl: './modal-score.component.html',
  styleUrls: ['./modal-score.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ModalScoreComponent {
  @Input() public score!: string;
  @Input() public isUserWin!: boolean;

  @Output() public handleRetry: EventEmitter<void> = new EventEmitter();
}
