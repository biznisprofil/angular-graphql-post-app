export interface Posts {
    data: Post[]
    meta: any
    __typename: string
}

export interface Post {
    id: string
    title: string
    __typename: string
}

export interface PostsState {
    loading: boolean,
    posts: Post[]
}