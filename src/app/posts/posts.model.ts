export interface Posts {
    data: Post[]
    meta: any
    __typename: string
}

export interface Post {
    id: string
    title: string
    body: string
    __typename: string
}

export interface PostsState {
    loading: boolean,
    posts: Post[],
    post: Partial<Post>,
    viewPost: Post,
    updatedPost: Post,
    deletedPostId: string
}