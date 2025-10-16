import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// Sections
import { HeroComponent } from '../../sections/hero/hero.component';
import { WhyMeComponent } from '../../sections/why-me/why-me.component';
import { SkillsComponent } from '../../sections/skills/skills.component';
import { ProjectsHeadlineComponent } from '../../sections/projects-headline/projects-headline.component';
import { ProjectsListComponent } from '../../sections/projects-list/projects-list.component';
import { ReferencesComponent } from '../../sections/references/references.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { ContactFormWebComponent } from '../../sections/contact-form-web/contact-form-web.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // Basis & Router/Translate (wichtig!)
    CommonModule,
    RouterModule,
    TranslateModule,

    // Sections
    HeroComponent,
    WhyMeComponent,
    SkillsComponent,
    ProjectsHeadlineComponent,
    ProjectsListComponent,
    ReferencesComponent,
    ContactComponent,
    ContactFormWebComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
