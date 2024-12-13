import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-rating-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StarRatingComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label for="rating" id="star-rating-label">Rate your experience</label>
      <app-star-rating formControlName="rating"></app-star-rating>

      <!-- Error message handling -->
      <div
        *ngIf="ratingControl?.touched && ratingControl?.invalid"
        class="error-message"
        role="alert"
      >
        {{ errorMessage }}
      </div>

      <div class="form-buttons">
        <button type="submit" [disabled]="form.invalid">Submit</button>

        @if(form.dirty){
        <button type="button" (click)="reset()">Reset</button>
        }
      </div>
    </form>
  `,
  styleUrls: ['./rating-form.component.scss'],
})
export class RatingFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1)]], // Default initial value
    });
  }

  // Get the rating control once to avoid repetition
  get ratingControl() {
    return this.form.get('rating');
  }

  // Get the error message based on the validation
  get errorMessage(): string {
    const control = this.ratingControl;
    if (control?.hasError('required')) return 'Please select a rating.';
    if (control?.hasError('min')) return 'Rating must be at least 1.';
    return '';
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted with Rating:', this.form.value);
    }
  }

  reset(): void {
    this.form.reset();
    this.ratingControl?.markAsTouched();
  }
}
