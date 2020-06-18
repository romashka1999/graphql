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
            async resolve(parent, args) {
                try {
                    return await Author.findById(parent.authorId);
                } catch (error) {
                    
                }
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
            async resolve(parent, args) {
                try {
                    return await Book.find({
                        authorId: parent.id
                    })
                } catch (error) {
                    
                }
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
            async resolve(parent, args) {
                try {
                    return Book.findById(args.id);
                } catch (error) {
                    
                }
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: graphql.GraphQLID }
            },
            async resolve(parent, args) {
                try {
                    return Author.findById(args.id);
                } catch (error) {
                    
                }
            }
        },
        books: {
            type: new graphql.GraphQLList(BookType),
            async resolve(parent, args) {
                try {
                    return await Book.find();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        authors: {
            type: new graphql.GraphQLList(AuthorType),
            async resolve(parent, args) {
                try {
                    return await Author.find();
                } catch (error) {
                    console.log(error);
                }
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
                name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
                age: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
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
                    console.log(error);
                }
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
                genre: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
                authorId: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) }
            },
            async resolve(parent, args) {
                const book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                try {
                    const savedBook = await book.save();
                    return savedBook;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: MuTation
});

