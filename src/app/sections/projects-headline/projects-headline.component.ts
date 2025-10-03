import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';  

@Component({
  selector: 'app-projects-headline',
  standalone: true,
  imports: [TranslateModule],                          
  templateUrl: './projects-headline.component.html',
  styleUrls: ['./projects-headline.component.scss']
})
export class ProjectsHeadlineComponent {}
