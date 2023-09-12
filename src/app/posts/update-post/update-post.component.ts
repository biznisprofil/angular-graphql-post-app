import { Component, OnInit } from '@angular/core';
import { PostsActions } from 'src/app/store/actions/posts.actions';
import { Store } from '@ngrx/store';
import { selectViewPosts } from 'src/app/store/selectors/posts.selector';
import { Post } from '../posts.model';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  titleValue: string = ''
  bodyValue: string = ''

  viewPost!: Post

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectViewPosts).subscribe(data => {
      console.log(data)
      this.viewPost = data
      this.titleValue = data.title
      this.bodyValue = data.body
    })
  }

  updatePost() {
    const cleanValue = this.titleValue.trim()
    
    if (cleanValue.length === 0) {
      return
    }

    const post = {
      title: this.titleValue,
      body: this.bodyValue
    }

    this.store.dispatch(PostsActions.updatePost({ post, id : this.viewPost.id }))

  }

}