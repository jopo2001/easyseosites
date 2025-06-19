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
import { GaleriaComponent } from './blog/galeria/galeria.component';
import { RegionesComponent } from './cotizador/regiones/regiones.component';
import { ProductosComponent } from './cotizador/productos/productos.component';
import { ProductosEditarComponent } from './cotizador/productos-editar/productos-editar.component';
import { PreciosComponent } from './cotizador/precios/precios.component';
import { PreciosEditarComponent } from './cotizador/precios-editar/precios-editar.component';
import { ProductosAgregarComponent } from './cotizador/productos-agregar/productos-agregar.component';
import { ListaBlogsEnComponent } from './blog/lista-blogs-en/lista-blogs-en.component';
import { TranslateBlogComponent } from './blog/translate-blog/translate-blog.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateBlogComponent,
    ListaBlogsComponent,
    EditarBlogComponent,
    LoginComponent,
    GaleriaComponent,
    RegionesComponent,
    ProductosComponent,
    ProductosEditarComponent,
    PreciosComponent,
    PreciosEditarComponent,
    ProductosAgregarComponent,
    ListaBlogsEnComponent,
    TranslateBlogComponent,
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
