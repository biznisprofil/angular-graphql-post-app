import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { EMPTY } from "rxjs";
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
}