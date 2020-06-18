import React from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../queries/queries';



function BookDetails(props) {

    const displayBookDetails = () => {
        const data = props.data;
        if(data.loading) {
            return <h1>Loading...</h1>
        } else {
            const book = props.data.book;
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books of author: </p>
                    <ul className="other-books">
                        {
                            book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }
    }

    return (
        <div id="bood-details">
            <p>Book Details Here: </p>
            {props.bookId && displayBookDetails()}
        </div>
    )
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);
