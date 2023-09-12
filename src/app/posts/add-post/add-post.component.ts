import { Component } from '@angular/core';
import { PostsActions } from 'src/app/store/actions/posts.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  titleValue: string = ''
  bodyValue: string = ''

  constructor(
    private store: Store
  ) { }

  addNewPost() {
    const cleanValue = this.titleValue.trim()
    if (cleanValue.length === 0) {
      return
    }
    const post = {
      title: this.titleValue,
      body: this.bodyValue
    }
    this.store.dispatch(PostsActions.addPost({ post }))
  }

}