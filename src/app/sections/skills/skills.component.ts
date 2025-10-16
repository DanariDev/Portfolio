import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

type SkillItem = { id: string; label: string; src: string };

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skills: SkillItem[] = [
    { id: 'angular', label: 'Angular', src: 'assets/img/skills/angular.svg' },
    {
      id: 'typescript',
      label: 'TypeScript',
      src: 'assets/img/skills/typescript.svg',
    },
    {
      id: 'javascript',
      label: 'JavaScript',
      src: 'assets/img/skills/javascript.svg',
    },
    { id: 'html', label: 'HTML', src: 'assets/img/skills/html5.svg' },
    { id: 'css', label: 'CSS', src: 'assets/img/skills/css3.svg' },
    { id: 'api', label: 'REST-API', src: 'assets/img/skills/api.svg' },
    {
      id: 'firebase',
      label: 'Firebase',
      src: 'assets/img/skills/firebase.svg',
    },
    { id: 'git', label: 'Git', src: 'assets/img/skills/git.svg' },
    { id: 'scrum', label: 'Scrum', src: 'assets/img/skills/scrum.svg' },
    {
      id: 'material',
      label: 'Material design',
      src: 'assets/img/skills/material.svg',
    },
    {
      id: 'questions',
      label: 'Questions',
      src: 'assets/img/skills/question.svg',
    },
  ];

  constructor(private scroller: ViewportScroller) {}

  goTo(id: string): void {
    const el = document.getElementById(id);
    el ? this.scrollToElement(el) : this.scroller.scrollToAnchor(id);
  }

  private scrollToElement(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
