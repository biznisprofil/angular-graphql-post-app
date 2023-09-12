import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { ADD_POSTS, GET_POSTS, UPDATE_POSTS } from '../graphql.operations';
import { Post } from '../posts/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private apollo: Apollo
  ) { }

  public getAllPosts() {
    return this.apollo.watchQuery({
        query: GET_POSTS
      }).valueChanges.pipe(map((result: any) => result.data.posts.data))
  }

  public addPost(post: Post) {
    return this.apollo
      .mutate({
        mutation: ADD_POSTS,
        variables: {
          input: post
        }
    }).pipe(map((result: any) => result))
  }

  public updatePost(post: Post, id: string) {
    return this.apollo
      .mutate({
        mutation: UPDATE_POSTS,
        variables: {
          id: id,
          input: post
        }
    }).pipe(map((result: any) => result.data.updatePost))
  }

}