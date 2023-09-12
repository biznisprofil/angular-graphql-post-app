import { gql } from 'apollo-angular';

const GET_POSTS = gql`
    query (
        $options: PageQueryOptions
    ) {
            posts(options: $options) {
            data {
                id
                title
            }
            meta {
                totalCount
            }
        }
    }
`

export { GET_POSTS }