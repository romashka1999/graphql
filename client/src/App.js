import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Booklist from './components/BookList';
import AddBook from './components/AddBook';

const client =  new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

function App() {
    
    return (
        <ApolloProvider
            client={client}>
            <div id="main">
                <Booklist />
                <AddBook />
            </div>
        </ApolloProvider>
    );
}

export default App;
