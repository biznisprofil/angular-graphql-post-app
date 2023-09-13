import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsActions } from '../store/actions/posts.actions';
import { selectDeletedPostId, selectNewPostValue, selectPosts, selectUpdatedPostValue } from '../store/selectors/posts.selector';
import { Post } from './posts.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  currentPage: number = 1
  pageSize: number = 10
  totalItems: number = 100
  searchTerm: string = ''

  posts: Post[] = []
  displayedPosts: Post[] = []
  pageNumbers: number[] = []

  subscription = new Subscription()

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.dispatch(PostsActions.loadAllPosts())
    this.manageSubscriptions()
  }

  postPreview(post: Post) {
    this.store.dispatch(PostsActions.viewPost({post}))
  }

  searchPosts() {
    this.currentPage = 1
    // when we search remove the pagintaion and show all posts that match searchTerm
    const pageSize = this.searchTerm ? this.totalItems : this.pageSize
    this.calculateDisplayedPosts(pageSize)
  }

  calculateDisplayedPosts(pageSize: number) {
    const filteredPosts = this.posts.filter((post) =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
    const totalPages = Math.ceil(filteredPosts.length / pageSize);
    this.pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    const startIndex = (this.currentPage - 1) * pageSize
    this.displayedPosts = filteredPosts.slice(startIndex, startIndex + pageSize)
    // for simplicity pagination is performed on the client 
    // in real world application it should be implemented on BE
    this.generatePageNumbers(pageSize);
  }

  generatePageNumbers(pageSize: number) {
    const totalPages = Math.ceil(this.posts.length / pageSize);
    this.pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.calculateDisplayedPosts(this.pageSize)
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.calculateDisplayedPosts(this.pageSize)
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize)
    if (this.currentPage < totalPages) {
      this.currentPage++
      this.calculateDisplayedPosts(this.pageSize)
    }
  }

  // this methods serves only to simulate updated data on the server
  addNew(post: Partial<Post>) {
    this.displayedPosts.unshift(post as Post)
  }

  update(post: Post) {
    const index = this.displayedPosts.findIndex(x => x.id === post.id)
    this.displayedPosts[index] = post;
  }

  delete(id: string) {
    const index = this.displayedPosts.findIndex(x => x.id === id)
    if (index > -1) { 
      this.displayedPosts.splice(index, 1)
    }
  }

  manageSubscriptions() {
    this.subscription.add(
      this.store.select(selectPosts).subscribe((data: Post[]) => {
        this.posts = data
        this.calculateDisplayedPosts(this.pageSize)
      })
    )
    this.subscription.add(
      this.store.select(selectNewPostValue).subscribe((data) => {
        if (data?.title) {
          this.addNew(data)
        }
      })
    )
    this.subscription.add(
      this.store.select(selectUpdatedPostValue).subscribe((data) => {
        if (data?.title) {
          this.update(data)
        }
      })
    )
    this.subscription.add(
      this.store.select(selectDeletedPostId).subscribe((postId) => {
        this.delete(postId)
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
