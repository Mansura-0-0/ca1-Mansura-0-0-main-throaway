import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { MovieDetails, MovieResult, SearchResults } from './moviedetails.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieapiService {
  public movie = signal<MovieDetails | null>(null);
  public movies = signal<MovieResult[]>([]);
  public errorMessage = signal('');
  public totalResults = signal(0);
  public maxPages = signal(1);
  public currentPage = signal(1);
  public currentSearchTitle = signal('');

  private http = inject(HttpClient);

  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = '9020d38b';

  public getMovies(title: string): void {
    if (title.trim() === '') {
      this.movies.set([]);
      this.movie.set(null);
      this.errorMessage.set('Please enter a movie title');
      this.totalResults.set(0);
      this.maxPages.set(1);
      this.currentPage.set(1);
      this.currentSearchTitle.set('');
      return;
    }

    this.currentSearchTitle.set(title);
    this.currentPage.set(1);
    this.loadMovies();
  }

  public getMovie(imdbID: string): void {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&i=${imdbID}`;

    this.http.get<MovieDetails>(url)
      .pipe(take(1))
      .subscribe((data) => {
        if (data.Response === 'True') {
          this.movie.set(data);
          this.errorMessage.set('');
        } else {
          this.movie.set(null);
          this.errorMessage.set(data.Error ?? 'Movie not found');
        }
      });
  }

  public nextPage(): void {
    if (this.currentPage() < this.maxPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadMovies();
    }
  }

  public previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadMovies();
    }
  }

  private loadMovies(): void {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&s=${this.currentSearchTitle()}&page=${this.currentPage()}`;

    this.http.get<SearchResults>(url)
      .pipe(take(1))
      .subscribe((data) => {
        if (data.Response === 'True') {
          this.movies.set(data.Search ?? []);
          this.errorMessage.set('');
          this.movie.set(null);

          const total = Number(data.totalResults);
          this.totalResults.set(total);
          this.maxPages.set(Math.ceil(total / 10));
        } else {
          this.movies.set([]);
          this.movie.set(null);
          this.errorMessage.set(data.Error ?? 'Movie not found');
          this.totalResults.set(0);
          this.maxPages.set(1);
        }
      });
  }

}