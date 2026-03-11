export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Country: string;
  Awards: string;
  BoxOffice: string;
 
  Response: string;
  Error?: string;
}

export interface MovieResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResults {
  Search?: MovieResult[];
  totalResults?: string;
  Response: string;
  Error?: string;
}