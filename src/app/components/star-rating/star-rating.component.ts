import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stars" role="radiogroup" aria-labelledby="star-rating-label">
      <ng-container *ngFor="let star of stars; let i = index">
        <i class="star" [class.filled]="i < value" (click)="onStarClick(i)">
          ★
        </i>
      </ng-container>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true,
    },
  ],
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements ControlValueAccessor {
  value = 0;
  stars = Array(5).fill(false);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.value = value || 0;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onStarClick(index: number): void {
    this.value = index + 1;
    this.onChange(this.value);
    this.onTouched();
  }
}
