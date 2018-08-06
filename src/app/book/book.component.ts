import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { Author } from '../models/author';
import { Chapter } from '../models/chapter';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers:[]
})
export class BookComponent implements OnInit {

  private myForm: FormGroup;

  private books:Observable<Book[]>; // all books list
  private authors:Author[] = [
    
  ]; // all authors
  private book:Book; // instance to saved
  private chapter:Chapter;
  formEdit:boolean = true;
  bookDetail:Book;
  

  constructor(private bookService: BookService, private router:Router) {
    this.books = this.bookService.booksList;
  }

  ngOnInit() {
    this.getAllBooks();
    this.getAllAuthors();  
  }

  
 
  redirectTobookDetail(book) 
    {
    this.bookService.bookDetail = book;
    this.router.navigateByUrl('/detail/' + book.id);
  }

  byAuthor(item1,item2){
    return item1 && item2 && item1.id == item2.id;
  }
  
  getAllBooks() {
    this.bookService.getAllBooks();
  }

  getAllAuthors() {
    this.bookService.getAllAuthors().subscribe(data => this.authors = data, error => console.log(error));
  }
  
  openBookForm () {
    this.formEdit = false;
  }

  toggleForm () {
    this.formEdit = !this.formEdit
  }

  setNewBook () {
    this.toggleForm();
    this.book = new Book({
      title:'',
      chapters:[]
    }); // instance to save
  }

  setBook (book:Book) {
    this.toggleForm();
    this.book = book;
  }

  addBook() {
    if (!this.book.id) {
      //save book
      this.bookService.addBook(this.book);
    } else {
      // update book
      this.bookService.updateBook(this.book);
    }
    this.toggleForm();
  }

  removeBook(index: number) {
    this.bookService.removeBook(index); 
  }

  removeChapter(i: number) {
    this.book.chapters.splice(i ,1); 
  }
  
   addChapter() {
    this.chapter = new Chapter({
      title:''
    }); 
     this.book.chapters.push(this.chapter);
  }

}
