import { gql } from 'apollo-boost';

export const getAuthorsQUery =  gql` 
    {
        authors {
            id
            name
        }
    }
`;


export const getBooksQuery =  gql` 
    {
        books {
            name
            id
        }
    }
`;

export const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`;