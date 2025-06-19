import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { ListaBlogsComponent } from './blog/lista-blogs/lista-blogs.component';
import { EditarBlogComponent } from './blog/editar-blog/editar-blog.component';
import { LoginComponent } from './login/login.component';
import { ListaBlogsEnComponent } from './blog/lista-blogs-en/lista-blogs-en.component';
import { TranslateBlogComponent } from './blog/translate-blog/translate-blog.component';

const routes: Routes = [
  { path: "", component: ListaBlogsComponent }, //Temporal
  { path: "login", component: LoginComponent },


  { path: "crear-blog", component: CreateBlogComponent },
  { path: "lista-blogs", component: ListaBlogsComponent },
  { path: "editar-blog/:id", component: EditarBlogComponent },
  { path: "lista-blogs-en", component: ListaBlogsEnComponent},
  { path: "translate-blog/:id", component: TranslateBlogComponent },

  //{ path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
