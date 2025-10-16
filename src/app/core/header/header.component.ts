import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private t = inject(TranslateService);

  isOpen = false;
  lang = 'de';

  ngOnInit(): void {
    const saved = localStorage.getItem('lang');
    const browser = this.t.getBrowserLang();
    this.lang =
      saved || this.t.currentLang || (browser?.match(/de|en/) ? browser : 'de');
    this.t.use(this.lang);
  }

  setLang(next: 'de' | 'en'): void {
    if (this.lang === next) return;
    this.lang = next;
    localStorage.setItem('lang', next);
    this.t.use(next);
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }
}
