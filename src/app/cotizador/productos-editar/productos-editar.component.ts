import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CotizadorService } from '../../cotizador.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../classes/cot-productos';
import { ProductoLimite } from '../../classes/cot-limites';
import { Color } from '../../classes/cot-colores';

@Component({
  selector: 'app-productos-editar',
  templateUrl: './productos-editar.component.html',
  styleUrl: './productos-editar.component.css'
})
export class ProductosEditarComponent implements OnInit {
  producto: Producto = new Producto('', '', 0, 0, 'no', '', '', '', 0);
  limites: ProductoLimite = new ProductoLimite(0, 0, 0, 0, 0);
  colores: Color[] = [];

  productoId!: number;
  productoCargado = false;

  constructor(
    private route: ActivatedRoute,
    private service: CotizadorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDatosProducto();
  }

  cargarDatosProducto() {
    this.service.getProductoById(this.productoId).subscribe(data => {
      this.producto = data.producto;
      this.limites = data.limites;
      this.colores = data.colores;
      this.productoCargado = true;
    });
  }

  agregarColor() {
    this.colores.push(new Color('', this.producto.id!));
  }

  eliminarColor(index: number) {
    this.colores.splice(index, 1);
  }

  actualizarProducto() {
    const payload = {
      producto: this.producto,
      limites: this.limites,
      colores: this.colores.map(c => c.color)
    };

    this.service.editarProducto(payload).subscribe(() => {
      this.snackBar.open('Producto actualizado correctamente', 'Cerrar', { duration: 3000 });
      this.cargarDatosProducto();
      //this.router.navigate(['/productos']);
    });
  }
}
