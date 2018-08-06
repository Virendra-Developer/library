import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  providers:[]
})
export class BookDetailComponent {


  private book:Book;
  constructor(private bookService:BookService) {

    this.book = this.bookService.bookDetail;

   }

  
}
