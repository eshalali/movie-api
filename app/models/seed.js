// seed.js is going to be the file we run whenever we want to seed our db, we'll create a bunch of pets at once
// want to be careful with this because when run, it will delete all prev pets in db, can modify later to only delete pets that don't have owner already

const mongoose = require('mongoose')
const Movie = require('./movie')
const db = require('../../config/db')

const startMovies = [
    { title: 'Interstellar', length: '2h 49m', wellReceived: true},
    { title: 'Inception', length: '2h 28m', wellReceived: true},
    { title: 'Life is Beautiful', length: '1h 58m', wellReceived: true},
    { title: 'Kill Bill Vol. 1', length: '1h 51m', wellReceived: true},
    { title: 'My Man Godfrey', length: '1h 30m', wellReceived: true}
]

// first we need to connect to the database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // first we remove all of the pets without owners
        Movie.deleteMany({ owner: null })
            .then(deletedMovies => {
                console.log('deletedMovies:', deletedMovies)
                // the next step is to use our startPets array to create our seeded pets
                Movie.create(startMovies)
                    .then(newMovies => {
                        console.log('newMovies:', newMovies)
                        mongoose.connection.close()
                    })
                    .catch(err => {
                        console.log(err)
                        mongoose.connection.close()
                    })
            })
            .catch(err => {
                console.log(err)
                mongoose.connection.close()
            })
    })
    .catch(err => {
        console.log(err)
        mongoose.connection.close()
    })