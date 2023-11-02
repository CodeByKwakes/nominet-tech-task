import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'ntt-add-name-server',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-name-server.component.html',
  styleUrls: ['./add-name-server.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNameServerComponent {
  @Output() formSubmit: EventEmitter<string[]> = new EventEmitter<string[]>();

  #formBuilder = inject(FormBuilder);
  form = this.#formBuilder.group({
    nameservers: ['', Validators.required]
  });

  submitForm() {
    const rawNameservers = this.form.get('nameservers')?.value;
    if (!rawNameservers) {
      return;
    }
    const nameservers = rawNameservers
      .split('\n')
      .map((ns: string) => ns.trim())
      .filter(Boolean);
    this.formSubmit.emit(nameservers);
    this.form.reset();
  }
}
