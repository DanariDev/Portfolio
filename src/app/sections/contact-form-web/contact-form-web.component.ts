import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

type ContactModel = {
  name: string;
  email: string;
  message: string;
};

type ErrorKeys =
  | 'CONTACTFORM.ERROR_NAME'
  | 'CONTACTFORM.ERROR_EMAIL'
  | 'CONTACTFORM.ERROR_MESSAGE'
  | 'CONTACTFORM.ERROR_PRIVACY';

@Component({
  selector: 'app-contact-form-web',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './contact-form-web.component.html',
  styleUrls: ['./contact-form-web.component.scss'],
})
export class ContactFormWebComponent {
  model: ContactModel = { name: '', email: '', message: '' };
  accepted = false;
  isSending = false;

  errors: Partial<
    Record<'name' | 'email' | 'message' | 'accepted', ErrorKeys>
  > = {};

  onAcceptChange(): void {
    this.errors.accepted = this.accepted
      ? undefined
      : 'CONTACTFORM.ERROR_PRIVACY';
  }

  private validate(): boolean {
    const e: typeof this.errors = {};

    if (!this.model.name.trim()) e.name = 'CONTACTFORM.ERROR_NAME';

    const mail = this.model.email.trim();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    if (!okEmail) e.email = 'CONTACTFORM.ERROR_EMAIL';

    if (!this.model.message.trim()) e.message = 'CONTACTFORM.ERROR_MESSAGE';

    if (!this.accepted) e.accepted = 'CONTACTFORM.ERROR_PRIVACY';

    this.errors = e;
    return Object.keys(e).length === 0;
  }

  onSubmit() {
    if (!this.accepted || this.isSending) return;

    this.isSending = true;
    const payload = {
      name: this.model.name,
      email: this.model.email,
      message: this.model.message,
    };

    fetch('/sendMail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert('Nachricht erfolgreich gesendet ✅');
          this.model = { name: '', email: '', message: '' };
          this.accepted = false;
        } else {
          alert('Fehler beim Senden ❌');
        }
      })
      .catch(() => alert('Server nicht erreichbar ❌'))
      .finally(() => (this.isSending = false));
  }
}
