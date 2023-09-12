import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsActions } from '../store/actions/posts.actions';
import { selectPosts } from '../store/selectors/posts.selector';
import { Post } from './posts.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  error: any;

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(PostsActions.loadAllPosts())

    this.store.select(selectPosts).subscribe((data: Post[]) => {
      this.posts = data
    })
  }
}
