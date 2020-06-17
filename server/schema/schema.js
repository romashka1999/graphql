const graphql = require('graphql');

const Book = require('../models/Book');
const Author = require('../models/Author');



const BookType = new graphql.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        genre: { type: graphql.GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return authors.find(author => author.id === parent.authorId);
            }
        }
    })
});

const AuthorType =  new graphql.GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        books: {
            type: new graphql.GraphQLList(BookType),
            resolve(parent, args) {
                // return books.filter(book => book.authorId === parent.id);
            }
        }
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: graphql.GraphQLID }
            },
            resolve(parent, args) {
                // return books.find(book => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: graphql.GraphQLID }
            },
            resolve(parent, args) {
                // return authors.find(author => author.id === args.id);
            }
        },
        books: {
            type: new graphql.GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
            }
        },
        authors: {
            type: new graphql.GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
            }
        }
    }
});

const MuTation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: graphql. GraphQLString },
                age: { type: graphql. GraphQLInt },
            },
            async resolve(parent, args) {
                const author = new Author({
                    name: args.name,
                    age: args.age
                });
                try {
                    const savedAuthor = await author.save();
                    return savedAuthor;
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: MuTation
});

