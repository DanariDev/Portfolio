import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-why-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './why-me.component.html',
  styleUrls: ['./why-me.component.scss'],
})
export class WhyMeComponent {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  goTo(id: string) {
    const el = this.doc.getElementById(id);
    if (!el) {
      this.doc.location.hash = id; 
      return;
    }

    const headerEl = this.doc.querySelector('app-header') as HTMLElement | null;
    const headerOffset = headerEl ? headerEl.getBoundingClientRect().height : 100;

    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
