import { Component } from '@angular/core';
import { Search } from '../search/search';
import { Results } from '../results/results';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Search, Results],
  templateUrl: './home.html'
})
export class Home {
}
