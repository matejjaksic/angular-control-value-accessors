import { Component } from '@angular/core';
import { RatingFormComponent } from './components/rating-form/rating-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RatingFormComponent],
})
export class AppComponent {
  title = 'angular-control-value-accessors';
}
