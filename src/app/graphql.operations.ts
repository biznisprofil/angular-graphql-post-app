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

export { GET_POSTS }