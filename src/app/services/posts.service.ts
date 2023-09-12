import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_POSTS } from '../graphql.operations';

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

}