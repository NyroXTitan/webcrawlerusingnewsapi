import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIf, NgForOf],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  nodata:string ='No articles found. Click "Fetch News" to load articles.';
  news: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {
  }

  fetchNews() {
    this.nodata = '';
    this.loading = true;
    this.http.get<any>('https://newsapi.org/v2/everything?domains=bbc.com&apiKey=12facf31f0df455784226e90487fab92').subscribe({next: (response) => {
          this.nodata = '';
          this.news = response.articles;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load news. Please try again.';
          this.loading = false;
        }
      });
  }
}
