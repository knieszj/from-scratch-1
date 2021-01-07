const app = require('../app')
const request = require('supertest')

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
        request(app).get('/api/books')
            .then(response => {
                // expect(response.body).toBe(mockBookList)
                expect(response.body).toEqual(mockBookList)
                done();
            })
    })
    it('see individual book deatils', async (done) => {
        request(app).get('/api/books/' + 1)
            .then(response => {
                // expect(response.body).toBe(mockBookList[0])
                expect(response.body).toEqual(mockBookList[0])
                done();
            })
    })
    it("I want to be able to check out a book for two weeks so that I may read it", async () => {
        let response = await request(app).get("/api/books/1/checkout/1234")
        // console.log(response.body)
        expect(response.status).toEqual(200);
        expect(response.body.CheckedOut).toEqual(true);
        expect(response.body.UserID).toEqual("1234");  
      });
     
    it('if a book is not available to check out because someone else checked it out', async (done) => {
        request(app).get('/api/books/3/checkout' + 77777)
            .then(response => {
               expect(response.body).toContain("not available")
               done();
            })
    })

    // it('if a book is not available to check out because I have it', async (done) => {
    //     request.get('/api/books/3/checkout' + 99999)
    //         .then(response => {
    //             expect(response.body).toContain("You have the book")
    //             done();
    //         })
    // })

})  