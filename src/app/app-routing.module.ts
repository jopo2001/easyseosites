import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { ListaBlogsComponent } from './blog/lista-blogs/lista-blogs.component';
import { EditarBlogComponent } from './blog/editar-blog/editar-blog.component';
import { LoginComponent } from './login/login.component';
import { ListaBlogsEnComponent } from './blog/lista-blogs-en/lista-blogs-en.component';
import { TranslateBlogComponent } from './blog/translate-blog/translate-blog.component';
import { HeaderMainComponent } from './header/header-main/header-main.component';
import { FooterMainComponent } from './footer/footer-main/footer-main.component';
import { GaleriaMainComponent } from './galeria/galeria-main/galeria-main.component';
import { HeaderMainAgregarComponent } from './header/header-main-agregar/header-main-agregar.component';

import { CreateLPComponent } from './landing_pages/create-lp/create-lp.component';
import { EditarLPComponent } from './landing_pages/editar-lp/editar-lp.component';
import { ListaLPComponent } from './landing_pages/lista-lp/lista-lp.component';
import { HeaderMainEditarComponent } from './header/header-main-editar/header-main-editar.component';
import { HeaderSubmenuAgregarComponent } from './header/header-submenu-agregar/header-submenu-agregar.component';
import { HeaderSubmenuEditarComponent } from './header/header-submenu-editar/header-submenu-editar.component';
import { HeadScriptsComponent } from './scripts/head-scripts/head-scripts.component';
import { HeadScriptsAgregarComponent } from './scripts/head-scripts-agregar/head-scripts-agregar.component';
import { HeadScriptsEditarComponent } from './scripts/head-scripts-editar/head-scripts-editar.component';
import { BodyScriptsComponent } from './scripts/body-scripts/body-scripts.component';
import { BodyScriptsAgregarComponent } from './scripts/body-scripts-agregar/body-scripts-agregar.component';
import { BodyScriptsEditarComponent } from './scripts/body-scripts-editar/body-scripts-editar.component';
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
  { path: "header/editar-enlace/:id", component: HeaderMainEditarComponent },

  { path: "footer/configuracion", component: FooterMainComponent },
  { path: "galeria/configuracion", component: GaleriaMainComponent },

  { path: "header/editar-subenlace/:id", component: HeaderSubmenuEditarComponent },
  { path: "header/agregar-subenlace/:id_menu", component: HeaderSubmenuAgregarComponent },

  { path: "scripts/main-head", component: HeadScriptsComponent },
  { path: "scripts/main-head/agregar", component: HeadScriptsAgregarComponent },
  { path: "scripts/main-head/editar/:id", component: HeadScriptsEditarComponent },
  { path: "scripts/main-body", component: BodyScriptsComponent },
  { path: "scripts/main-body/agregar", component: BodyScriptsAgregarComponent },
  { path: "scripts/main-body/editar/:id", component: BodyScriptsEditarComponent },
  { path: "esqueletos", component: EsqueletosComponent },





  //{ path: "scripts/main-body", component: BodyComponent },





  //{ path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
