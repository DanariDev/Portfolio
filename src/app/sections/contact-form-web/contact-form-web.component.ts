import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

type ContactModel = { name: string; email: string; message: string };
type ErrKey =
  | 'CONTACTFORM.ERROR_NAME'
  | 'CONTACTFORM.ERROR_EMAIL'
  | 'CONTACTFORM.ERROR_MESSAGE'
  | 'CONTACTFORM.ERROR_PRIVACY'
  | 'CONTACTFORM.ERROR_SEND'
  | 'CONTACTFORM.ERROR_SERVER';

type ToastKind = 'success' | 'error';

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

  errors: Partial<Record<'name' | 'email' | 'message' | 'accepted', ErrKey>> =
    {};

  toast = {
    show: false,
    kind: 'success' as ToastKind,
    msgKey: 'CONTACTFORM.SENT',
  };
  private toastTimer?: any;

  onAcceptChange(): void {
    this.errors.accepted = this.accepted
      ? undefined
      : 'CONTACTFORM.ERROR_PRIVACY';
  }

  private validate(): boolean {
    const e: typeof this.errors = {};
    if (!this.model.name.trim()) e.name = 'CONTACTFORM.ERROR_NAME';
    if (!this.isValidEmail(this.model.email))
      e.email = 'CONTACTFORM.ERROR_EMAIL';
    if (!this.model.message.trim()) e.message = 'CONTACTFORM.ERROR_MESSAGE';
    if (!this.accepted) e.accepted = 'CONTACTFORM.ERROR_PRIVACY';
    this.errors = e;
    return Object.keys(e).length === 0;
  }

  async onSubmit(): Promise<void> {
    if (this.isSending) return;
    if (!this.validate()) return;

    this.isSending = true;
    try {
      const res = await fetch('/sendMail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.model),
      });
      const data = await res.json();
      if (data.success) {
        this.resetForm();
        this.openToast('success', 'CONTACTFORM.SENT');
      } else {
        this.errors.message = 'CONTACTFORM.ERROR_SEND';
        this.openToast('error', 'CONTACTFORM.ERROR_SEND');
      }
    } catch {
      this.errors.message = 'CONTACTFORM.ERROR_SERVER';
      this.openToast('error', 'CONTACTFORM.ERROR_SERVER');
    } finally {
      this.isSending = false;
    }
  }

  private resetForm(): void {
    this.model = { name: '', email: '', message: '' };
    this.accepted = false;
    this.errors = {};
  }

  get okName(): boolean {
    return !!this.model.name.trim() && !this.errors.name;
  }

  get okEmail(): boolean {
    return this.isValidEmail(this.model.email) && !this.errors.email;
  }

  get okMessage(): boolean {
    return !!this.model.message.trim() && !this.errors.message;
  }

  private isValidEmail(v: string): boolean {
    const mail = (v || '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  }

  private openToast(kind: ToastKind, msgKey: string): void {
    this.toast = { show: true, kind, msgKey };
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.closeToast(), 3500);
  }

  closeToast(): void {
    this.toast.show = false;
  }
}
