import { createActionGroup, props } from "@ngrx/store";
import { emptyProps } from "@ngrx/store";
import { Post } from "src/app/posts/posts.model";

export const PostsActions = createActionGroup({
    source: 'Posts',
    events: {
        'Load all Posts': emptyProps(),
        'Add Post': props<{ post: Partial<Post> }>(),
        'View Post': props<{ post: Post }>(),
        'Update Post': props<{ post: Partial<Post>, id: string }>(),
        'Delete Post': props<{ postId: string }>(),
    }
})

export const PostsApiActions = createActionGroup({
    source: 'Posts API',
    events: {
        'Posts Loaded Success': props<{ posts: Post[] }>(),
        'Post Added Success': props<{ post: Post }>(),
        'Post Updated Success': props<{ post: Post }>(),
        'Post Deleted Success': props<{ post: Post }>(),
        'Post Operation Failed': props<{ error: Error }>()
    }
})
