import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { log } from 'console';
@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [NavbarComponent,CommonModule ],
})
export class HomepageComponent {
    quote: string = '';
    author: string = '';
    books: any[] = [];
    constructor(private http: HttpClient,private bookService: BookService) { }

    ngOnInit(): void {
      this.fetchQuote();
      this.bookService.getBooks().subscribe(
        (data) => {
          this.books = data;
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    }
    fetchQuote() {
      this.http.get<any>('https://api.quotable.io/random').subscribe(
        (response) => {
          this.quote = response.content;
          this.author = response.author;
        },
        (error) => {
          console.error('Error fetching quote:', error);
        }
      );
    }

    generateRatingArray(averageRating: number): number[] {
      const ratingArray = [];
      for (let i = 0; i < averageRating; i++) {
          ratingArray.push(1);
      }
      const totalStars = ratingArray.length;
      for (let i = totalStars; i < averageRating; i++) {
          ratingArray.push(0);
      }
      return ratingArray;
  }



 
}