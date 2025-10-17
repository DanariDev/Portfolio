import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
  private router = inject(Router);

  isOpen = false;
  lang: 'de' | 'en' = 'de';

  ngOnInit(): void {
    const saved = localStorage.getItem('lang') as 'de' | 'en' | null;
    const browser = (this.t.getBrowserLang() || '').toLowerCase();
    this.lang =
      saved || (browser.match(/^(de|en)$/) ? (browser as 'de' | 'en') : 'de');
    this.t.use(this.lang);
    document.documentElement.setAttribute('lang', this.lang);
  }

  setLang(next: 'de' | 'en'): void {
    if (this.lang === next) return;
    this.lang = next;
    localStorage.setItem('lang', next);
    this.t.use(next);
    document.documentElement.setAttribute('lang', next);
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
    document.documentElement.classList.toggle('menu-open', this.isOpen);
    document.body.classList.toggle('menu-open', this.isOpen);
  }

  closeMenu(): void {
    this.isOpen = false;
    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
  }

  scrollTo(id: string, ev?: Event): void {
    ev?.preventDefault();

    const basePath = this.router.url.split('#')[0];
    const onHome = basePath === '/' || basePath === '/home';

    const finish = () => {
      this.closeMenu();
      setTimeout(() => this.doScroll(id), 60);
    };

    if (!onHome) {
      this.router.navigateByUrl('/').then(() => setTimeout(finish, 120));
    } else {
      finish();
    }
  }

  private doScroll(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const cssHeaderHeight = rootStyles.getPropertyValue('--header-h').trim();
    const headerHeight =
      parseInt(cssHeaderHeight.replace('px', '')) ||
      (document.querySelector('.site-header') as HTMLElement)?.offsetHeight ||
      92;

    const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });

    const newUrl = `${location.pathname}${location.search}#${id}`;
    history.replaceState(null, '', newUrl);
  }
}
