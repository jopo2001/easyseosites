import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { ListaBlogsComponent } from './blog/lista-blogs/lista-blogs.component';
import { EditarBlogComponent } from './blog/editar-blog/editar-blog.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { LoginComponent } from './login/login.component';
import { GaleriaComponent } from './generales/galeria/galeria.component';
import { ListaBlogsEnComponent } from './blog/lista-blogs-en/lista-blogs-en.component';
import { TranslateBlogComponent } from './blog/translate-blog/translate-blog.component';
import { HeaderMainComponent } from './header/header-main/header-main.component';
import { HeaderMainAgregarComponent } from './header/header-main-agregar/header-main-agregar.component';

//Imports nuevos
import { CreateLPComponent } from './landing_pages/create-lp/create-lp.component';
import { EditarLPComponent } from './landing_pages/editar-lp/editar-lp.component';
import { ListaLPComponent } from './landing_pages/lista-lp/lista-lp.component';
import { BlogComponent } from './esqueletos/blog/blog.component';
import { EsqueletosComponent } from './esqueletos/esqueletos.component';
import { HeaderComponent } from './esqueletos/header/header.component';
import { FooterComponent } from './esqueletos/footer/footer.component';
import { GaleriaFotosComponent } from './esqueletos/galeria/galeria.component';
import { ContactoComponent } from './esqueletos/contacto/contacto.component';
import { HeaderMainEditarComponent } from './header/header-main-editar/header-main-editar.component';
import { HeaderSubmenuEditarComponent } from './header/header-submenu-editar/header-submenu-editar.component';
import { HeaderSubmenuAgregarComponent } from './header/header-submenu-agregar/header-submenu-agregar.component';
import { HeadScriptsComponent } from './scripts/head-scripts/head-scripts.component';
import { HeadScriptsAgregarComponent } from './scripts/head-scripts-agregar/head-scripts-agregar.component';
import { HeadScriptsEditarComponent } from './scripts/head-scripts-editar/head-scripts-editar.component';
import { BodyScriptsComponent } from './scripts/body-scripts/body-scripts.component';
import { BodyScriptsAgregarComponent } from './scripts/body-scripts-agregar/body-scripts-agregar.component';
import { BodyScriptsEditarComponent } from './scripts/body-scripts-editar/body-scripts-editar.component';
import { FooterMainComponent } from './footer/footer-main/footer-main.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateBlogComponent,
    ListaBlogsComponent,
    EditarBlogComponent,
    LoginComponent,
    GaleriaComponent,
    ListaBlogsEnComponent,
    TranslateBlogComponent,
    HeaderMainComponent,
    HeaderMainAgregarComponent,
    CreateLPComponent,
    EditarLPComponent,
    ListaLPComponent,
    BlogComponent,
    EsqueletosComponent,
    HeaderComponent,
    FooterComponent,
    GaleriaFotosComponent,
    ContactoComponent,
    HeaderMainEditarComponent,
    HeaderSubmenuEditarComponent,
    HeaderSubmenuAgregarComponent,
    HeadScriptsComponent,
    HeadScriptsAgregarComponent,
    HeadScriptsEditarComponent,
    BodyScriptsComponent,
    BodyScriptsAgregarComponent,
    BodyScriptsEditarComponent,
    FooterMainComponent,
    
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    DragDropModule,
    MatTreeModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
