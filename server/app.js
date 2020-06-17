const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/graphql',{ useNewUrlParser: true })
.then(() => {
    console.log('connected to mongodb successfully');
})
.catch((err) => {
    console.error(err);
});


const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('server listening to the 4000 port');
});