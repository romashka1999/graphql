import React, { useState } from 'react';
import { graphql, useMutation } from 'react-apollo';

import { getAuthorsQUery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook(props) {

    const [book, setBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    });

    const [addBookMut] = useMutation(addBookMutation);



    const displayAuthors = () => {
        const data = props.data;
        if(data.loading) {
            return <option disabled>Loading ... authors</option>
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            });
        }
    }

    const sumbitForm = (e) => {
        e.preventDefault();
        addBookMut({
            variables: {
                name: book.name,
                genre: book.genre,
                authorId: book.authorId
            },
            refetchQueries: [{ 
                query: getBooksQuery
            }]
        }).then(val => {
            console.log(val)
        })
    }
    
    return(
        <form id="add-book" onSubmit={sumbitForm}>
            <div className="field">
                <label>Book name:</label>
                <input 
                    type="text" 
                    onChange={(e) => {
                        e.persist();
                        setBook((curState) => {
                            return {
                                ...curState,
                                name: e.target.value
                            }
                    })}}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input 
                    type="text" 
                    onChange={(e) => {
                        e.persist();
                        setBook((curState) => {
                            return {
                                ...curState,
                                genre: e.target.value
                            }
                    })}}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select
                    onChange={(e) => {
                        e.persist();
                        setBook((curState) => {
                            return {
                                ...curState,
                                authorId: e.target.value
                            }
                    })}}>
                    <option>Select author</option>
                    { displayAuthors() }
                </select>
            </div>
            <button >+</button>
        </form>
    );
}

export default graphql(getAuthorsQUery)(AddBook);
