import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { ListaBlogsComponent } from './blog/lista-blogs/lista-blogs.component';
import { EditarBlogComponent } from './blog/editar-blog/editar-blog.component';
import { LoginComponent } from './login/login.component';
import { RegionesComponent } from './cotizador/regiones/regiones.component';

import { ProductosComponent } from './cotizador/productos/productos.component';
import { ProductosEditarComponent } from './cotizador/productos-editar/productos-editar.component';
import { PreciosComponent } from './cotizador/precios/precios.component';
import { PreciosEditarComponent } from './cotizador/precios-editar/precios-editar.component';
import { ProductosAgregarComponent } from './cotizador/productos-agregar/productos-agregar.component';
import { ListaBlogsEnComponent } from './blog/lista-blogs-en/lista-blogs-en.component';
import { TranslateBlogComponent } from './blog/translate-blog/translate-blog.component';

const routes: Routes = [
  { path: "", component: ListaBlogsComponent }, //Temporal
  { path: "login", component: LoginComponent },

  { path: "regiones", component: RegionesComponent },

  { path: "productos", component: ProductosComponent },
  { path: "productos/agregar", component: ProductosAgregarComponent },
  { path: "productos/editar/:id", component: ProductosEditarComponent },



  { path: "productos-precios", component: PreciosComponent },
  { path: "editar-precios-productos/:id", component: PreciosEditarComponent },
  

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
