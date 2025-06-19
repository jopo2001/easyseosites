// blog-translate.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { domain } from '../../classes/globals';

@Component({
  selector: 'app-lista-blogs-en',
  templateUrl: './lista-blogs-en.component.html',
  styleUrl: './lista-blogs-en.component.css'
})
export class ListaBlogsEnComponent implements OnInit {
    public domain = domain;
  

   blogsTranslate: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.obtenerTraducciones();
  }

  obtenerTraducciones(): void {
    this.adminService.getBlogTraducciones().subscribe((data) => {
      this.blogsTranslate = data;
    });
  }

  editar(id: number) {
    // Redirige a la vista de edición
    window.location.href = `/traducir-blog/${id}`;
  }

  traducir(id_es: number) {
    // Redirige a la creación de blog_EN pasando id_translate_ES
    window.location.href = `/traducir-blog/nuevo/${id_es}`;
  }


}
