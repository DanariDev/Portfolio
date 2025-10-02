import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

type SkillItem = { label: string; src: string };

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],   // <-- wichtig!
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skills: SkillItem[] = [
    { label: 'Angular',        src: 'assets/img/skills/angular.svg' },
    { label: 'TypeScript',     src: 'assets/img/skills/typescript.svg' },
    { label: 'JavaScript',     src: 'assets/img/skills/javascript.svg' },
    { label: 'HTML',           src: 'assets/img/skills/html5.svg' },
    { label: 'CSS',            src: 'assets/img/skills/css3.svg' },
    { label: 'REST-API',       src: 'assets/img/skills/api.svg' },
    { label: 'Firebase',       src: 'assets/img/skills/firebase.svg' },
    { label: 'Git',            src: 'assets/img/skills/git.svg' },
    { label: 'Scrum',          src: 'assets/img/skills/scrum.svg' },
    { label: 'Material Design',src: 'assets/img/skills/material.svg' },
  ];
}
