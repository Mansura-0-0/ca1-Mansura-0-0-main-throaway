import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieapiService } from '../movieapi-service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './results.html'
})
export class Results {
  public movieService = inject(MovieapiService);
}
