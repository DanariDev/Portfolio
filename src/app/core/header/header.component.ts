import { Component, HostListener, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  lang: 'de' | 'en' = 'de';
  isOpen = false;

  constructor(
    private i18n: TranslateService,
    @Inject(DOCUMENT) private doc: Document
  ) {
    const cur = this.i18n.currentLang || 'de';
    this.lang = (cur === 'en' ? 'en' : 'de');
    this.i18n.use(this.lang);
  }

  setLang(l: 'de' | 'en') {
    this.lang = l;
    this.i18n.use(l);
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.lockScroll(this.isOpen);
  }

  closeMenu() {
    this.isOpen = false;
    this.lockScroll(false);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 1000 && this.isOpen) this.closeMenu();
  }

  private lockScroll(lock: boolean) {
    this.doc.body.style.overflow = lock ? 'hidden' : '';
  }
}
