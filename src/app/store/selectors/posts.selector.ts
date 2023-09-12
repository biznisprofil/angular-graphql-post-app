import { createSelector, createFeatureSelector } from "@ngrx/store";
import { PostsState } from "src/app/posts/posts.model";

export const selectPostsFeature = createFeatureSelector<PostsState>('posts')

export const selectLoading = createSelector(
    selectPostsFeature,
    (state) => state.loading
)

export const selectPosts = createSelector(
    selectPostsFeature,
    (state) => state.posts
)

export const selectNewPostValue = createSelector(
    selectPostsFeature,
    (state) => state.post
)

export const selectViewPosts = createSelector(
    selectPostsFeature,
    (state) => state.viewPost
)

export const selectUpdatedPostValue = createSelector(
    selectPostsFeature,
    (state) => state.updatedPost
)
