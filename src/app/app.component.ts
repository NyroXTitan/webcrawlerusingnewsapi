import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';

interface NewsResponse {
  articles: { title: string; description: string; }[]; // Use T[] instead of Array<T>
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIf, NgForOf],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  nodata = 'No articles found. Click "Fetch News" to load articles.'; // Removed explicit string type annotation
  news: { title: string; description: string; }[] = []; // Use T[] instead of Array<T>
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  fetchNews() {
    this.nodata = '';
    this.loading = true;
    this.error = null;

    this.getNews().subscribe({
      next: (response: NewsResponse) => {
        if (response.articles.length === 0) {
          this.nodata = 'No articles found.';
        }
        this.news = response.articles;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load news. Please try again.';
        this.loading = false;
      },
    });
  }

private getNews(): Observable<NewsResponse> {
    const apiUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=12facf31f0df455784226e90487fab92';
    return this.http.get<NewsResponse>(apiUrl);
  }
}
