import { createReducer, on } from "@ngrx/store";
import { PostsActions, PostsApiActions } from "../actions/posts.actions";

import { Post, PostsState } from "src/app/posts/posts.model";

export const initialState: PostsState = {
    loading: false,
    posts: [],
    post: {},
    viewPost: {} as Post,
    updatedPost: {} as Post,
    deletedPostId: ''
}

export const postsReducer = createReducer(
    initialState,
    on(PostsActions.loadAllPosts, (state) => {
        return { ...state, loading: true }
    }),
    on(PostsApiActions.postsLoadedSuccess, (state, { posts }) => {
        return { ...state, posts, loading: false }
    }),
    on(PostsActions.addPost, (state, { post }) => {
        return { ...state, post }
    }),
    on(PostsApiActions.postAddedSuccess, (state, { post }) => {
        return { ...state, post }
    }),
    on(PostsActions.viewPost, (state, { post }) => {
        return { ...state, viewPost: post }
    }),
    on(PostsApiActions.postUpdatedSuccess, (state, { post }) => {
        return { ...state, updatedPost: post }
    }),
    on(PostsApiActions.postDeletedSuccess, (state, { id }) => {
        return { ...state, deletedPostId: id }
    }),
)