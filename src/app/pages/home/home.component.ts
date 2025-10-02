import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { HeroComponent } from '../../sections/hero/hero.component';
// import { WhyMeComponent } from '../../sections/why-me/why-me.component';
// import { SkillsComponent } from '../../sections/skills/skills.component';
// import { ProjectsHeadlineComponent } from '../../sections/projects-headline/projects-headline.component';
// import { ProjectsListComponent } from '../../sections/projects-list/projects-list.component';
// import { ReferencesComponent } from '../../sections/references/references.component';
// import { ContactComponent } from '../../sections/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    // HeroComponent,
    // WhyMeComponent,
    // SkillsComponent,
    // ProjectsHeadlineComponent,
    // ProjectsListComponent,
    // ReferencesComponent,
    // ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
