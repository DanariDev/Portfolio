import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

type ProjectLink = { github?: string; live?: string };
type ProjectItem = {
  id: string;
  title: string;
  tech: string;
  desc: string;
  img: string;
  links?: ProjectLink;

  fit?: 'contain';            
  focus?:
    | 'top' | 'bottom' | 'left' | 'right'
    | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects: ProjectItem[] = [];
  private sub?: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.sub = this.translate.stream('PROJECTS.ITEMS').subscribe((items: unknown) => {
      this.projects = Array.isArray(items) ? (items as ProjectItem[]) : [];
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  isReverse(i: number): boolean {
    return i % 2 === 1;
  }

  trackById(_: number, p: ProjectItem): string {
    return p.id;
  }
}
