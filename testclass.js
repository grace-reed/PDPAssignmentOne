class Publication {
  title;
  author;
  year = new Date().getYear();
  constructor(title, author, year) {
    if (!title || !author || !year) {
      throw new Error(
        "I need an author, title, and year to create a publication"
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
class Book extends Publication {
  publisher;
  constructor(title, author, year, ISBN, publisher) {
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
    return `${this.author} (${this.year}). ${this.title}. ${this.publisher}. ${this.ISBN} `;
  }
  citeMLA() {
    return "${this.author}" + "${this.title}" + "${this.year}" + "${this.doi}";
  }
}
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
    return (
      "${this.author}" +
      "${this.year}" +
      "${this.title}" +
      "${this.journal}" +
      "${this.volume}" +
      "${this.doi}"
    );
  }
  citeMLA() {
    return "${this.author}" + "${this.title}" + "${this.year}" + "${this.doi};";
  }
}
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
    return { title: this.title, url: this.URL, date: this.date };
  }
  citeMLA() {
    return "${this.title}" + "${this.URL}" + "${this.date}";
  }
}
class PublicationManager {
  publications = [];
  addPaper(title, author, year, doi, journal, volume) {
    console.log(journal, volume);
    this.publications.push(
      new Paper(title, author, doi, year, journal, volume)
    );
  }
  addBook(title, author, year, ISBN, publisher) {
    this.publications.push(new Book(title, author, ISBN, year, publisher));
  }
  addWebpage(title, URL, date) {
    this.publications.push(new Webpage(title, URL, date));
  }
  printCitations(type) {
    for (let pub of this.publications) {
      if (type === "APA") console.log(pub.citeAPA());
      else console.log(pub.citeMLA());
    }
  }
}
const pubManager = new PublicationManager();
pubManager.addPaper("Navio", "John Guerra", "doi12345", 2018, "TVCG", 18);
pubManager.addPaper("BTacile", "Mafe Zuniga", "doi12345", 2021, "CHI", 92);
pubManager.addPaper(
  "Wrong typo",
  "Jhn of course ",
  "doi12345",
  2022,
  "IEEVIS",
  16
);
pubManager.addBook("Scrum", "David", "ISBN787", 2005, "Elsevier");
pubManager.addBook(
  "Rationality",
  "Christopher",
  "ISBN787",
  2021,
  "Oveja Negra"
);
pubManager.addWebpage("Wikipedia", "www.wikipedia.com", 2020);
pubManager.printCitations("APA");

titles = [];

function getTitles(value) {
  titles.push(value.title);
}

pubManager.publications.forEach(getTitles);

countLetters(titles);

function countLetters(titles) {
  text = value.join("").replace(/\s/g, "");
  a = char_count(text, "a") / text.length;
  console.log("Percent of a's in all publication titles combined: " + a);
}

function char_count(str, letter) {
  var letter_Count = 0;
  for (var position = 0; position < str.length; position++) {
    if (str.charAt(position) == letter) {
      letter_Count += 1;
    }
  }
  return letter_Count;
}
