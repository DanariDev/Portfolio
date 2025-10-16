import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Reference {
  name: string;
  project: string;
  text: string;
}

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss'],
})
export class ReferencesComponent {
  references: Reference[] = [];

  constructor(private translate: TranslateService) {
    this.loadReferences();
  }

  private loadReferences(): void {
    this.translate
      .stream('REFERENCES.ITEMS')
      .subscribe((items) => (this.references = items || []));
  }
}
