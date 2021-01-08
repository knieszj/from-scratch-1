const express = require("express");
const app = express();
// const PORT = process.env.PORT || 3020;
const PORT = 3020;
const bookList = require('./library.json');

app.use(express.json());

// let bookList = [
//     {
//         BookID: '1',
//         Title: 'Test Book Tilte',
//         Author: 'Test Author',
//         ISBN: "Test ISBN",
//         CheckedOut: false,
//         DateDueBack: "2021-01-01",
//         UserID: null
//     }, {
//         BookID: '2',
//         Title: 'Test Book Tilte 2',
//         Author: 'Test Author 2',
//         ISBN: "Test ISBN 2",
//         CheckedOut: false,
//         DateDueBack: "2021-03-01",
//         UserID: null
//     }, {
//         BookID: '3',
//         Title: 'Test Book Tilte 3',
//         Author: 'Test Author 3',
//         ISBN: "Test ISBN 3",
//         CheckedOut: true,
//         DateDueBack: "2021-05-05",
//         UserID: '99999'
//     },
// ]

app.get('/api/books', (request, response) => {
    //send bookList to Server/ API 
    response.json(bookList) 
    // response.send("smiley face")
})

app.get('/api/books/:bookID', (request, response) => {
    // for example: /api/books/1
    let aBook = bookList.filter(book => book.BookID === request.params.bookID ? true : false)
    aBook.length === 1 ?
        response.json(aBook[0]) //if id is vaild
        : response.json("Invaild book ID") //if id not vaild
})

app.get('/api/books/:bookId/checkout/:userId', (request, response) => {
    // for example: /api/books/2/checkout/1234
    //for displyaing userID & Book
    const date = new Date()
    date.setDate(date.getDate() + 14);
    let userIdParam = request.params.userId

    let checkoutBook = bookList.filter(book => book.BookID === request.params.bookId ? true : false)

    //for checkout availability
    if (checkoutBook[0].CheckedOut === false) {
        //0 = 1st object in the array-object 
        checkoutBook[0].CheckedOut = true
        checkoutBook[0].DateDueBack = date
        checkoutBook[0].UserID = userIdParam
        // response.json([checkoutBook[0], "The book is available, and you are checking it out"])
        response.json(checkoutBook[0])
    } else {
        checkoutBook[0].UserID === request.params.userId ?             
            response.json(`You have the book, and you checked it out on ${date}`) //if I checked it out 
            : //if someone else checked it out 
            response.json(`The book is not available, please check back after ${checkoutBook[0].DateDueBack}`)
        }
})
  

app.listen(PORT);
module.exports = app;  