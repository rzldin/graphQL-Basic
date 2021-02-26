const express           = require('express');
const { graphqlHTTP }       = require('express-graphql');
const { buildSchema }   = require('graphql');

const app = express();


let forumData = [
    { id : "1", name : "rald", age : "17"},
    { id : "2", name : "virgo", age : "27"},
    { id : "3", name : "dino", age : "22"},
    { id : "4", name : "budi", age : "31"}
]

let schema = buildSchema(`

        type Forum {
            id      : ID,
            name    : String,
            age     : String
            
        }

        type Query{
            forum(id: ID!)  : Forum,
            forums : [Forum]
        }
    `)

/** Untuk Resolve / Fetch data */
let resolvers = {

    /** Jika datanya hanya 1 */
    forum : (args) => {
        return forumData.find(el => el.id == args.id)
    },

    /** Jika datanya lebih dari 1 */
    forums : () => forumData
}

app.use('/graphql', graphqlHTTP({
    schema : schema,
    rootValue : resolvers,
    graphiql : true // Tampilan GUI
}))

app.listen(4000, ()=>{
    console.log('berhasil berjalan');
})