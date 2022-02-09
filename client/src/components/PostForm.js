import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from '../utils/Hooks';
import { FETCH_POSTS_QUERY } from '../utils/GraphQL';
import {client} from '../index';

function PostForm() {

    const { values, onChange, onSubmit } = useForm(createPostCallbk, {
        body: ''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = client.readQuery({
                query: FETCH_POSTS_QUERY
            });
            // data.getPosts = [result.data.createPost, ...data.getPosts]
            client.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: [result.data.createPost, ...data.getPosts]
            })
            console.log(result, 'the result'); 
            values.body = ''
        }
    })

    function createPostCallbk() {
        createPost();
    }
    
    return (
        <>
        <form onSubmit={onSubmit}>
            <h3>Create a post: </h3>
            <input type="text" name='body' onChange={onChange} value={values.body} />
            <button type="submit">Submit</button>
        </form>
            {error && (
                <div className="ui error msg">
                    {error.graphQLErrors[0].message}
                </div>
        )}
        </>
        
  );
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id body createdAt username
        likes{
            id username createdAt
        }
        likeCount
        comments{
            id body username createdAt
        }
    }
}
`

export default PostForm;