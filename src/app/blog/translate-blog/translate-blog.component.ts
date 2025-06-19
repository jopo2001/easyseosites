import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { BlogEN } from '../../classes/blog_EN';
import { Blog } from '../../classes/blog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-translate-blog',
  templateUrl: './translate-blog.component.html',
  styleUrl: './translate-blog.component.css'
})
export class TranslateBlogComponent implements OnInit {
 public blogEN = new BlogEN('','',0,'','','','',0,'','','','','','','','','','','',0);

  public blogES = new Blog('','',0,'','','','',0,'','','','','','','','','','','',0);;
  public id_es: number = 0;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.id_es = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerBlogES();
    this.obtenerBlogEN();
  }

  obtenerBlogES(): void {
    this.adminService.getBlogUP(4, this.id_es).subscribe((res) => {
      this.blogES = res;
      this.blogES.body = this.decodeHtml(res.body);

      //this.blogEN.id_translate_ES = res.id;
    });
  }

  obtenerBlogEN(): void {
    this.adminService.getBlogUPEN(this.id_es).subscribe((res) => {
      this.blogEN = res;
      this.blogEN.body = this.decodeHtml(res.body);

      //this.blogEN.id_translate_ES = res.id;
    });
  }

    decodeHtml(html: string): string { //Decodificar el contenido legible para TinyMCE
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }


  guardarTraduccion(): void {
    this.adminService.guardarBlogEN(this.blogEN).subscribe((res) => { 
      this.obtenerBlogES();
      this.obtenerBlogEN();
      this.snackBar.open('Blog Actualizado Exitosamente', 'Cerrar', { duration: 5000 });
      //this.router.navigate(['/traducciones-blog']);
    });
  }
}