import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';

interface Article {
  title: string;
  description: string;
  url: string;
}

interface NewsResponse {
  articles: Article[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIf, NgForOf],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  nodata = 'No articles found. Click "Fetch News" to load articles.'; // Removed explicit type annotation
  news: Article[] = []; // Replaced Array<T> with T[]
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  fetchNews(): void {
    this.nodata = '';
    this.loading = true;
    this.error = null;

    this.getNews().subscribe({
      next: (response: NewsResponse) => {
        if (response.articles.length === 0) {
          this.nodata = 'No articles found.';
        } else {
          this.news = response.articles;
        }
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = `Failed to load news: ${err.message}`;
        this.loading = false;
      },
    });
  }

  private getNews(): Observable<NewsResponse> {
    const apiUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=12facf31f0df455784226e90487fab92';
    return this.http.get<NewsResponse>(apiUrl);
  }
}


