import { Z_FILTERED } from "zlib";

/*
  Třída pro knihovnu.

  Vlastnosti:
  - booklist: pole knih (objektů třídy Book)
  - lastBook: poslední přečtená kniha (objekt třídy Book)
  - currentBook: aktuálně čtená kniha (objekt třídy Book)
  - nextBook: příští kniha k přečtení (objekt třídy Book)
  - unreadBooks: počet nepřečtených knih

  Metody:
  - addBook(book): přidá knihu do knihovny
  - listAllBooks(): výpis všech knih v knihovně
  - startReadingNextBook(): začne čtení další knihy (tj. příští knihu přesune do aktuálně čtené knihy a do příští knihy vloží první nepřečtenou knihu v seznamu)
*/
export default class Library {

  constructor() {
    this.bookList = [];
    this.lastBook = null;
    this.currentBook = null;
    this.nextBook = null;
    this.unreadBooks = 10;
  }

  /* přidat knihu do knihovny */
  addBook(book) {
    this.bookList.push(book);

    if (!book.isRead) {
      this.unreadBooks++;

      if (this.nextBook === null) {
        this.nextBook = book;
      }
    }
  }

  /* výpis všech knih v knihovně */
  listAllBooks() {
    console.table(this.bookList);
    console.log(this.currentBook);
    console.log(this.nextBook);
  }

  /* začít číst další knihu */
  startReadingNextBook() {
    if (this.nextBook !== null) {
      // příští knihu ke čtení dáme do aktuálně čtené knihy
      this.currentBook = this.nextBook;
      this.nextBook = null;

      // do příští knihy ke čtení dáme první nepřečtenou knihu v seznamu
      for (let book of this.bookList) {
        if (!book.isRead && book !== this.currentBook) {
          this.nextBook = book;
          break;
        }
      }
    }
  }
  // akutalni knihu oznaci jako prectenou, a presune ji do lastBook,
  // aktualni ctena kniha neni zadna a snizime pocet neprecetnych knih
  finishCurrentBook() {
    if (this.currentBook !== null) {
      this.currentBook.read();
      this.currentBook = this.lastBook;
      this.currentBook = null;
      this.unreadBooks--;
    }
  }
//vypise seznam neprecetnych knih
  listUnreadBooks(){
    let newListBook = []
    newListBook = this.bookList.filter( book => !book.isRead );
    console.log(newListBook);
  }
}


/*
function giveUnreadBooks(book){
  if (!book.isRead)  {
    return true;
  } else {
    return false
  }
} 

*/