import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { ListaBlogsComponent } from './blog/lista-blogs/lista-blogs.component';
import { EditarBlogComponent } from './blog/editar-blog/editar-blog.component';
import { LoginComponent } from './login/login.component';
import { ListaBlogsEnComponent } from './blog/lista-blogs-en/lista-blogs-en.component';
import { TranslateBlogComponent } from './blog/translate-blog/translate-blog.component';
import { HeaderMainComponent } from './header/header-main/header-main.component';
import { HeaderMainAgregarComponent } from './header/header-main-agregar/header-main-agregar.component';

import { CreateLPComponent } from './landing_pages/create-lp/create-lp.component';
import { EditarLPComponent } from './landing_pages/editar-lp/editar-lp.component';
import { ListaLPComponent } from './landing_pages/lista-lp/lista-lp.component';
// import { HeaderComponent } from './esqueletos/header/header.component';
import { EsqueletosComponent } from './esqueletos/esqueletos.component';

const routes: Routes = [
  { path: "", component: ListaBlogsComponent }, //Temporal
  { path: "login", component: LoginComponent },

  { path: "crear-lp", component: CreateLPComponent },
  { path: "lista-lp", component: ListaLPComponent },
  { path: "editar-lp/:id", component: EditarLPComponent },
  /*{ path: "lista-blogs-en", component: ListaBlogsEnComponent},
  { path: "translate-blog/:id", component: TranslateBlogComponent },*/
  { path: "header/configuracion", component: HeaderMainComponent },
  { path: "header/agregar-enlace", component: HeaderMainAgregarComponent },
  { path: "esqueletos", component: EsqueletosComponent }

  //{ path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
