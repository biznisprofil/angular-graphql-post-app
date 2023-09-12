import { createActionGroup, props } from "@ngrx/store";
import { emptyProps } from "@ngrx/store";
import { Post } from "src/app/posts/posts.model";

export const PostsActions = createActionGroup({
    source: 'Posts',
    events: {
        'Load all Posts': emptyProps(),
        'Add Post': props<{ post: Partial<Post> }>(),
        'Update Post': props<{ post: Post }>(),
        'Delete Post': props<{ postId: string }>(),
    }
})

export const PostsApiActions = createActionGroup({
    source: 'Posts API',
    events: {
        'Posts Loaded Success': props<{ posts: Post[] }>(),
        'Posts Added Success': props<{ post: Post }>(),
        'Posts Deleted Success': props<{ post: Post }>(),
        'Posts Operation Failed': props<{ error: Error }>()
    }
})
