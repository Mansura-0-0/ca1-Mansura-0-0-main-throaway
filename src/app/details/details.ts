import { Component, inject, input, OnInit } from '@angular/core';
import { MovieapiService } from '../movieapi-service';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.html'
})
export class Details implements OnInit {
  public imdbID = input.required<string>();
  public movieService = inject(MovieapiService);

  public ngOnInit(): void {
    this.movieService.getMovie(this.imdbID());
  }
}
