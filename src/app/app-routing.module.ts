import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { PostsComponent } from './posts/posts.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'update-post', component: UpdatePostComponent },
  { path: '',   redirectTo: '/posts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
