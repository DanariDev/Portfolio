import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  constructor(private scroller: ViewportScroller) {
    this.scroller.setOffset([0, 92]);
  }

  scrollDown(): void {
    this.scroller.scrollToAnchor('anchor1');
  }
}
