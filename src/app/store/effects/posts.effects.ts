import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { EMPTY, of } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";
import { PostsService } from "src/app/services/posts.service";

@Injectable()
export class PostsEffects {
    constructor(
        private actions$: Actions,
        private postsService: PostsService
    ) {

    }

    $loadPosts = createEffect(() => this.actions$.pipe(
        ofType('[Posts] Load all Posts'),
        exhaustMap(() => this.postsService.getAllPosts().pipe(
            map(posts => ({ type: '[Posts API] Posts Loaded Success', posts })),
            catchError(() => EMPTY)
        ))
    ))

    $addPost = createEffect(() => this.actions$.pipe(
        ofType('[Posts] Add Post'),
        exhaustMap(({ post }) => this.postsService.addPost(post).pipe(
            map(post => ({ type: '[Posts API] Post Added Success', post })),
            catchError((error) => of({ type: '[Posts API] Post Operation Failed', error }))
        ))
    ))

    $updatePost = createEffect(() => this.actions$.pipe(
        ofType('[Posts] Update Post'),
        exhaustMap(({ post, id }) => this.postsService.updatePost(post, id).pipe(
            map(post => ({ type: '[Posts API] Post Updated Success', post })),
            catchError((error) => of({ type: '[Posts API] Post Operation Failed', error }))
        ))
    ))

    $deletePost = createEffect(() => this.actions$.pipe(
        ofType('[Posts] Delete Post'),
        exhaustMap(({ id }) => this.postsService.deletePost(id).pipe(
            map(result => ({ type: '[Posts API] Post Deleted Success', id })),
            catchError((error) => of({ type: '[Posts API] Post Operation Failed', error }))
        ))
    ))
}