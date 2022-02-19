let inquirer = require('inquirer');


/**
 * Publication prepares information to be managed by the PublicationManager.
 */
class Publication {
  title;
  author;
  year = new Date().getYear();
  constructor(title, author, year) {
    if (!title || !author || !year) {
      throw new Error("I need an author, title and year to create a publication");
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
  constructor(title, author,ISBN, year, publisher) {
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
      this.isWebpage() && 
      this.URL !== undefined && 
      this.date !== undefined
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
}

const pubManager = new PublicationManager();

function AskUser(){
  inquirer.prompt([
  /**
   * Ask the user id they would like to add or remove a pub from pubManager.
   */
   {
    type: 'list',
    name: 'firstQ',
    message: "Would you like to add or remove a publication?",
    choices: ['add','remove'],
    },
  /**
   * If they're adding, ask the user what type of publication they're adding.
   */
  {
    type: 'list',
    name: "secondQ",
    message: "What type of publication are you adding?",
    choices: [
      'book', 
      'paper', 
      'webpage'
      ],
    when: function(answers) {
      return answers.firstQ !== 'remove';
    }
  },
  /**
   * If they're adding a book, ask the user for the title, author, year, ISBN and publisher.
   */
  {
    type: 'input',
    name: "title",
    message: "what's the title?",
    when: function(answers) {
      return answers.secondQ === 'book';
    }
  },
  {
    type: 'input',
    name: "author",
    message: "who's the author?",
    when: function(answers) {
      return answers.secondQ === 'book';
    }
  },
  {
    type: 'input',
    name: "year",
    message: "what year was it published?",
    when: function(answers) {
      return answers.secondQ === 'book';
    }
  },
  {
    type: 'input',
    name: "ISBN",
    message: "what's the ISBN?",
    when: function(answers) {
      return answers.secondQ === 'book';
    }
  },
  {
    type: 'input',
    name: "publisher",
    message: "who's the publishing company?",
    when: function(answers) {
      return answers.secondQ === 'book';
    }
  },
  /**
   * If they're adding a paper ask the user for the title, author, year, doi, journal and volume.
   */
  {
    type: 'input',
    name: "title",
    message: "what's the title?",
    when: function(answers) {
      return answers.secondQ === 'paper';
    }
  },
  {
    type: 'input',
    name: "author",
    message: "who's the author?",
    when: function(answers) {
      return answers.secondQ === 'paper';
    }
  },
  {
    type: 'input',
    name: "year",
    message: "what year was it published?",
    when: function(answers) {
      return answers.secondQ === 'paper';
    }
  },
  {
    type: 'input',
    name: "doi",
    message: "what's the doi number?",
    when: function(answers) {
      return answers.secondQ === 'paper';
    }
  },
  {
    type: 'input',
    name: "journal",
    message: "what's the name of the journal?",
    when: function(answers) {
      return answers.secondQ === 'paper';
    }
  },
  {
    type: 'input',
    name: "volume",
    message: "which volume?",
    when: function(answers) {
      return answers.secondQ === 'paper';
    }
  },
    /**
   * If they're adding a webpage ask the user for the title, author, year, URL and date.
   */
  {
    type: 'input',
    name: "title",
    message: "what's the title?",
    when: function(answers) {
      return answers.secondQ === 'webpage';
    }
  },
  {
    type: 'input',
    name: "author",
    message: "who's the author?",
    when: function(answers) {
      return answers.secondQ === 'webpage';
    }
  },
  {
    type: 'input',
    name: "year",
    message: "what year was it published?",
    when: function(answers) {
      return answers.secondQ === 'webpage';
    }
  },
  {
    type: 'input',
    name: "URL",
    message: "what's the URL?",
    when: function(answers) {
      return answers.secondQ === 'webpage';
    }
  },
  {
    type: 'input',
    name: "date",
    message: "what's date was it published?",
    when: function(answers) {
      return answers.secondQ === 'webpage';
    }
  },
  /**
   * If they're removing a publication, ask for the title.
   */
  {
    type: "input",
    name: "removeByTitle",
    message: "what's the title of the publication to remove?",
    when: function(answers) {
      return answers.firstQ == 'remove';
    }
  },

  ]).then(function(answers){
    connection.query("INSERT INTO baes SET ?", {
      pubType: answers.secondQ,
      title: answers.title,
      author: answers.author,
      year: answers.year,
      ISBN: answers.ISBN,
      publisher: answers.publisher,
      doi: answers.doi,
      journal: answers.journal,
      volume: answers.volume,
      URL: answers.URL,
      date: answers.date
    },function(error){
      if (error)throw error;
    console.log("added pub");
    interaction()
    })
  })

AskUser();


/**
 * connectInputwithDB should prepare inquirer input to be added to the publication array by the manager.
 */
function connectInputwithDB(){
  if (pubType == 'book') {
    pubManager.addPaper(title, author, year, doi, journal, volume);
  } 
  if (pubType == "paper") {
    pubManager.addBook(title, author, year, ISBN, publisher); 
  }
  if (pubType == "webpage") {
    pubManager.addWebpage(title, author, year, URL, date);
  }
}
connectInputwithDB();

/**
 * TitleStatistics is supposed to work as a class to gather titles and count the number of A's in all of the titles.
 * However, I'm not sure how to encapsulate the functions so that they work together.
 */
class TitlesStatistics {
  titles = [];
  getTitles(value) {
    titles.push(value.title);
  }
  populateTitlesArray(){
    pubManager.publications.forEach(getTitles);
  } 
  countLetters(titles) {
    var text = value.join("").replace(/\s/g, "");
    var a = char_count(text, "a") / text.length;
    console.log("Percent of a's in all publication titles combined: " + a);
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
pubManager.publications.forEach(getTitles);
countLetters(titles);
