const { response } = require('express')
const app = require('../app')
const request = require('supertest')(app)

let mockBookList = [
    {
        BookID: '1',
        Title: 'Test Book Tilte',
        Author: 'Test Author',
        ISBN: "Test ISBN",
        CheckedOut: false,
        DateDueBack: "2021-01-01",
        UserID: null
    }, {
        BookID: '2',
        Title: 'Test Book Tilte 2',
        Author: 'Test Author 2',
        ISBN: "Test ISBN 2",
        CheckedOut: false,
        DateDueBack: "2021-03-01",
        UserID: null
    },    {
        BookID: '3',
        Title: 'Test Book Tilte 3',
        Author: 'Test Author 3',
        ISBN: "Test ISBN 3",
        CheckedOut: true,
        DateDueBack: "2021-05-05",
        UserID: '99999'
    },
]

describe('As a user,', () => {
    it('I want to be able to see a list of every book in the library so that I can browse the selections.', async(done) => {
        request.get('/api/books')
            .then(response => {
                // expect(response.body).toBe(mockBookList)
                expect(response.body).toEqual(mockBookList)
                done();
            })
    })
    it('see individual book deatils', async (done) => {
        request.get('/api/books/' + 1)
            .then(response => {
                // expect(response.body).toBe(mockBookList[0])
                expect(response.body).toEqual(mockBookList[0])
                done();
            })
    })
    it('able to checkout a book for 2 weeks', async (done) => {
        const date = new Date()
        date.setDate(date.getDate() + 14);   
        
        request.get('/api/books/1/checkout/' + 1234)
            .then(response => {
                console.log("*********", (response.text) )   
                expect(response.text.CheckedOut).toEqual(true)
                expect(response.text.DateDueBack.getDay()).toContain(date.getDay())
                expect(response.text.UserID).toContain(1234)
                done();
            })
    })
    
    // it('if a book is not available to check out because someone else checked it out', async (done) => {
    //     request.get('/api/books/3/checkout' + 77777)
    //         .then(response => {
    //            expect(response.body).toContain("not available")
    //            done();
    //         })
    // })

    // it('if a book is not available to check out because I have it', async (done) => {
    //     request.get('/api/books/3/checkout' + 99999)
    //         .then(response => {
    //             expect(response.body).toContain("You have the book")
    //             done();
    //         })
    // })

}) 
  

 