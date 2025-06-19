import { Component, OnInit } from '@angular/core';
import { CotizadorService } from '../../cotizador.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{
   productos: any[] = [];

  constructor(
    private cotizadorService: CotizadorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cotizadorService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        this.snackBar.open('Error al cargar los productos', 'Cerrar', {
          duration: 3000,
        });
        console.error('Error al cargar productos:', error);
      }
    );
  }

  eliminarProducto(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    this.cotizadorService.eliminarProducto(id).subscribe(
      (res) => {
        this.snackBar.open('Producto eliminado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.cargarProductos();
      },
      (error) => {
        this.snackBar.open('Error al eliminar producto', 'Cerrar', {
          duration: 3000,
        });
        console.error('Error al eliminar producto:', error);
      }
    );
  }

}
