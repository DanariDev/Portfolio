import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
  @ViewChild('f') form?: NgForm;
  model: ContactModel = { name: '', email: '', message: '' };
  accepted = false;
  isSending = false;
  errors: Partial<Record<'name' | 'email' | 'message' | 'accepted', ErrKey>> =
    {};
  allValid = false;
  toast = {
    show: false,
    kind: 'success' as ToastKind,
    msgKey: 'CONTACTFORM.SENT',
  };
  private toastTimer?: any;

  ngOnInit(): void {
    this.validate();
  }

  onInput(): void {
    this.validate();
  }

  onAcceptChange(): void {
    this.errors.accepted = this.accepted
      ? undefined
      : 'CONTACTFORM.ERROR_PRIVACY';
    this.validate();
  }

  private validate(): boolean {
    const e: typeof this.errors = {};
    const name = (this.model.name || '').trim();
    if (!this.isValidName(name)) e.name = 'CONTACTFORM.ERROR_NAME';
    if (!this.isValidEmail(this.model.email))
      e.email = 'CONTACTFORM.ERROR_EMAIL';
    const msg = (this.model.message || '').trim();
    if (!msg || msg.length < 10) e.message = 'CONTACTFORM.ERROR_MESSAGE';
    if (!this.accepted) e.accepted = 'CONTACTFORM.ERROR_PRIVACY';
    this.errors = e;
    this.allValid = Object.keys(e).length === 0;
    return this.allValid;
  }

  private isValidName(v: string): boolean {
    const name = (v || '').trim();
    return /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/.test(name);
  }

  async onSubmit(formArg?: NgForm): Promise<void> {
    const form = formArg || this.form;
    if (!this.submitGuard(form)) return;
    this.isSending = true;
    try {
      const { ok, data } = await this.sendRequest();
      if (ok && data?.success) this.handleSuccess(form);
      else this.handleFailure('send');
    } catch {
      this.handleFailure('server');
    } finally {
      this.isSending = false;
    }
  }

  private submitGuard(form?: NgForm): boolean {
    this.validate();
    if (this.isSending || !this.allValid) {
      form?.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  private async sendRequest(): Promise<{ ok: boolean; data: any }> {
    const res = await fetch('/sendMail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.model),
    });
    let data: any = {};
    try {
      data = await res.json();
    } catch {
      data = {};
    }
    return { ok: res.ok, data };
  }

  private handleSuccess(form?: NgForm): void {
    this.resetForm();
    this.openToast('success', 'CONTACTFORM.SENT');
    form?.resetForm();
  }

  private handleFailure(kind: 'send' | 'server'): void {
    this.errors.message =
      kind === 'send' ? 'CONTACTFORM.ERROR_SEND' : 'CONTACTFORM.ERROR_SERVER';
    this.openToast('error', this.errors.message);
  }

  private resetForm(): void {
    this.model = { name: '', email: '', message: '' };
    this.accepted = false;
    this.errors = {};
    this.validate();
  }

  get okName(): boolean {
    return this.isValidName(this.model.name) && !this.errors.name;
  }

  get okEmail(): boolean {
    return this.isValidEmail(this.model.email) && !this.errors.email;
  }

  get okMessage(): boolean {
    return !!(this.model.message || '').trim() && !this.errors.message;
  }

  private isValidEmail(v: string): boolean {
    const mail = (v || '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail) && mail.length <= 254;
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
