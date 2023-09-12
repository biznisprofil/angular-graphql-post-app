import { gql } from 'apollo-angular';

const GET_POSTS = gql`
    query (
        $options: PageQueryOptions
    ) {
            posts(options: $options) {
            data {
                id
                title
                body
            }
            meta {
                totalCount
            }
        }
    }
`

const ADD_POSTS = gql`
    mutation (
        $input: CreatePostInput!
    ) {
        createPost(input: $input) {
            id
            title
            body
        }
    }
`

const UPDATE_POSTS = gql`
    mutation (
        $id: ID!,
        $input: UpdatePostInput!
    ) {
        updatePost(id: $id, input: $input) {
            id
            body
        }
    }
`

export { GET_POSTS, ADD_POSTS, UPDATE_POSTS }