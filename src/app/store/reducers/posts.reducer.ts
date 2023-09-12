import { createReducer, on } from "@ngrx/store";
import { PostsActions, PostsApiActions } from "../actions/posts.actions";

import { PostsState } from "src/app/posts/posts.model";

export const initialState: PostsState = {
    loading: false,
    posts: []
}

export const postsReducer = createReducer(
    initialState,
    on(PostsActions.loadAllPosts, (state) => {
        return { ...state, loading: true }
    }),
    on(PostsApiActions.postsLoadedSuccess, (state, { posts }) => {
        return { ...state, posts, loading: false }
    })
)