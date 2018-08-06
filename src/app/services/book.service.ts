import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Author } from '../models/author';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BookService {
  public  bookDetail:Book;
  
  public booksList: Observable<Book[]>;
  private __booksList: BehaviorSubject<Book[]>;
  private dataStore : {
    booksList:Book[]
  };
  constructor(private http:Http) { 
    this.dataStore = { booksList: [] };
    this.__booksList = <BehaviorSubject <Book[]> > new BehaviorSubject([]);
    this.booksList = this.__booksList.asObservable();
  }

  getAllBooks () {
    this.http.get("assets/data/books.json")
    .map(res => res.json())
    .subscribe(data => {
      this.dataStore.booksList = data;
      this.__booksList.next(Object.assign({}, this.dataStore).booksList);
    },
    error => {
      console.log(error);
    }
  );
  }

  addBook(book:Book) {
    book.id = this.dataStore.booksList.length + 1;
    this.dataStore.booksList.push(book);
    this.__booksList.next(Object.assign({}, this.dataStore).booksList);
  }
  
  removeBook (index:number) {
    this.dataStore.booksList.splice(index, 1);
    this.__booksList.next(Object.assign({}, this.dataStore).booksList);
  }

  updateBook (book:Book) {
    this.dataStore.booksList.forEach((t, i) => {
      if (t.id === book.id) { this.dataStore.booksList[i] = book; }
      });
  }


  getAllAuthors (): Observable<Author[]>  {
    return this.http.get("assets/data/authors.json")
                         .map((res:any) => <Author[]>res.json())
                         .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }

  errorHandler(error: any): void {
    console.log(error)
  }

}
