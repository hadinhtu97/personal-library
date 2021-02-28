# Personal Library

## Description
Backend APIs manage books in library

## Use
```
git clone https://github.com/hadinhtu97/personal-library
cd personal-library
npm install
touch .env
[This app use mongodb as database, you need to add a MONGO_URI variable into .env]
npm run start
```

## APIs
* GET
  * `[]/api/books` :  receive all the books
  * `[]/api/books/[_id]` : retrieve a book
* POST
  * `[]/api/books` : with `title` in form body to add a book
  * `[]/api/books/[_id]` : with `comment` in form body to add a comment to book
* DELETE
  * `[]/api/books/[_id]`: delete a book
  * `[]/api/books` : delete all book

## Testing
Functional test in `test` directory

Run the project and run `npm run test` to run tests.
