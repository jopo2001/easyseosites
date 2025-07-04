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
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
