import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  privacy: boolean;
};

@Component({
  selector: 'app-contact-form-web',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact-form-web.component.html',
  styleUrls: ['./contact-form-web.component.scss'],
})
export class ContactFormWebComponent {
  data: ContactFormData = { name: '', email: '', message: '', privacy: false };
  sending = false;
  sent = false;

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.sending) return;
    this.sending = true;
    try {
      // später hier firebase function o.ä. aufrufen
      console.log('contact submit', this.data);
      this.sent = true;
      form.resetForm({ name: '', email: '', message: '', privacy: false });
    } finally {
      this.sending = false;
    }
  }
}
