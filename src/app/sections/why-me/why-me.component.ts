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

  goTo(id: string): void {
    const el = this.doc.getElementById(id);
    if (!el) return;

    const header = this.doc.querySelector('.site-header') as HTMLElement | null;
    const offset = header ? header.offsetHeight + 16 : 100;

    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
