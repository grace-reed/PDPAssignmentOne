/**
 * Publication prepares information to be managed by the PublicationManager.
 */
class Publication {
  title;
  author;
  year = new Date().getYear();
  constructor(title, author, year) {
    if (!title || !author || !year) {
      throw new Error(
        "I need an author, title and year to create a publication"
      );
    }
    this.title = title;
    this.author = author;
    this.year = year !== undefined ? year : this.year;
  }
  isPublication() {
    return (
      this.title !== undefined &&
      this.author !== undefined &&
      this.year !== undefined
    );
  }
}

/**
 * Book inherits from Publication to store title, author,ISBN, year and publisher for management by the PublicationManager.
 */
class Book extends Publication {
  publisher;
  constructor(title, author, ISBN, year, publisher) {
    if (!publisher) {
      throw new Error("I need a publisher to create a book");
    }
    super(title, author, year);
    this.publisher = publisher;
    this.ISBN = ISBN;
  }
  isBook() {
    return this.isPublication() && this.publisher !== undefined;
  }
  citeAPA() {
    return `${this.author} (${this.year}). ${this.title}. ${this.publisher} `;
  }
  citeMLA() {
    return `${this.author}. ${this.title}. ${this.year}`;
  }
}
/**
 * Paper inherits from Publication to store title, author, year, doi, journal and volume for management by the PublicationManager.
 */
class Paper extends Publication {
  journal;
  volume;
  constructor(title, author, year, doi, journal, volume) {
    if (!journal || !volume) {
      throw new Error("I need a journal and volume to create a paper");
    }
    super(title, author, year);
    this.journal = journal;
    this.volume = volume;
    this.doi = doi;
  }
  isPaper() {
    if (
      this.isPublication() &&
      this.journal !== undefined &&
      this.volume !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  }
  citeAPA() {
    return `${this.author}.(${this.year}). ${this.title}.${this.journal}.${this.volume}`;
  }
  citeMLA() {
    return `${this.author}. ${this.title}. ${this.year}`;
  }
}
/**
 * WebPage inherits from Publication to store title, author, year, doi, journal and volume for management by the PublicationManager.
 */
class Webpage extends Publication {
  URL;
  date = new Date().getDate();
  constructor(title, author, year, URL, date) {
    super(title, author, year);
    if (!title || !URL || !date) {
      throw new Error("I need title, URL, and date to create a webpage!");
    }
    this.URL = URL;
    this.date = date;
  }
  isWebpage() {
    return (
      this.isWebpage() && this.URL !== undefined && this.date !== undefined
    );
  }
  citeAPA() {
    return `${this.title} (${this.URL}). ${this.date}. ${this.author}. ${this.year} `;
  }

  citeMLA() {
    return `${this.title}. ${this.URL}. ${this.date}`;
  }
}

/**
 * PublicationManager adds publications to publications array.
 */

class PublicationManager {
  publications = [];
  addPaper(title, author, year, doi, journal, volume) {
    console.log(journal, volume);
    this.publications.push(
      new Paper(title, author, doi, year, journal, volume)
    );
  }
  addBook(title, author, year, ISBN, publisher) {
    this.publications.push(new Book(title, author, year, ISBN, publisher));
  }
  addWebpage(title, author, year, URL, date) {
    this.publications.push(new Webpage(title, author, year, URL, date));
  }
  printCitations(type) {
    for (let pub of this.publications) {
      if (type === "APA") console.log(pub.citeAPA());
      else console.log(pub.citeMLA());
    }
  }
  getAllPublication() {
    return this.publications;
  }
}

const pubManager = new PublicationManager();

pubManager.addPaper("Navio", "John Guerra", "doi999", 2018, "TVCG", 18);
pubManager.addBook("Scrum", "David", "ISBN999", 2005, "Elsevier");
pubManager.addWebpage(
  "Homepage",
  "NEU",
  "2022",
  "https://www.khoury.northeastern.edu/",
  20220224
);
console.log(pubManager.printCitations("APA"));
console.log(pubManager.printCitations("MLA"));

/**
 * TitleStatistics is supposed to work as a class to gather titles and count the number of A's in all of the titles.
 * However, I'm not sure how to encapsulate the functions so that they work together.
 */
class TitlesStatistics {
  titles = [];

  // getTitles(value) {
  //   this.titles.push(value.title);
  // }

  // populateTitlesArray(){
  //   pubManager.publications.forEach(getTitles);
  // }

  populateTitlesArray(allPubs) {
    allPubs.forEach((pub) => {
      this.titles.push(pub.title);
    });
  }

  countLetters(value) {
    var text = value.replace(/\s/g, "");
    var a = this.char_count(text, "a") / text.length;
    return a;
  }
  countLettersAllTitles() {
    let sum = 0;
    this.titles.forEach((t) => {
      sum += this.countLetters(t);
    });
    console.log("Percent of a's in all publication titles combined: " + sum);
  }

  char_count(str, letter) {
    var letter_Count = 0;
    for (var position = 0; position < str.length; position++) {
      if (str.charAt(position) == letter) {
        letter_Count += 1;
      }
    }
    return letter_Count;
  }
}

const titlesStatistics = new TitlesStatistics();
titlesStatistics.populateTitlesArray(pubManager.getAllPublication());
titlesStatistics.countLettersAllTitles();

//pubManager.publications.forEach(getTitles);
//countLetters(titles);
