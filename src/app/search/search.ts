import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieapiService } from '../movieapi-service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html'
})
export class Search {
  public title = '';
  public movieService = inject(MovieapiService);

  public onSubmit(): void {
    this.movieService.getMovies(this.title);
  }
}
