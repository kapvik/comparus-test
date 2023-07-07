import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {
  public tableSize: number[] = [ ...Array(100).keys() ];
  public selectedTime: number = 0;
  public timerId: any = null;

  public userScore: WritableSignal<number> = signal(0);
  public systemScore: WritableSignal<number> = signal(0);
  public readyCell: WritableSignal<number | null> = signal(null);
  public winCells: WritableSignal<number[]> = signal([]);
  public defeatCells: WritableSignal<number[]> = signal([]);
  public isEndGame: WritableSignal<boolean> = signal(false);

  public startGame(): void {
    if (this.selectedTime > 0) {
      this.runGame();
    }
  }

  public updateScore(cellIndex: number): void {
    if (this.readyCell() !== cellIndex) {
      return;
    }

    this.changeCellToWin(cellIndex);

    if (this.winCells().length === 10) {
      this.endGame();
    } else {
      this.runGame();
    }    
  }

  public changeCellToReady(cellIndex: number): void {
    this.readyCell.set(cellIndex);
  }

  public changeCellToWin(cellIndex: number): void {
    clearInterval(this.timerId);
    this.winCells.mutate(cells => cells.push(cellIndex));
    this.userScore.update(score => score + 1);
  }

  public changeCellToDefeat(cellIndex: number): void {
    this.defeatCells.mutate(cells => cells.push(cellIndex));
    this.systemScore.update(score => score + 1);
  }

  public onRetry(): void {
    this.userScore.set(0);
    this.systemScore.set(0);
    this.readyCell.set(null);
    this.winCells.set([]);
    this.defeatCells.set([]);
    this.isEndGame.set(false);
    this.selectedTime = 0;
    this.timerId = null;
  }

  private runGame(): void {
    this.timerId = setInterval(() => {
      const cell = Math.floor(Math.random() * 100);
      const prevCell = this.readyCell();

      if (prevCell && !this.winCells().includes(prevCell)) {
        this.changeCellToDefeat(prevCell);
        
      }

      if (this.defeatCells().length === 10) {
        this.endGame();
      } else {
        this.changeCellToReady(cell);
      }

      }, this.selectedTime);

  }

  private endGame(): void {
    clearInterval(this.timerId);
    this.isEndGame.set(true);
  }
}
