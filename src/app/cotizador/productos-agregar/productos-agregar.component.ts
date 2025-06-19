import { Component, OnInit } from '@angular/core';
import { CotizadorService } from '../../cotizador.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../classes/cot-productos';
import { ProductoLimite } from '../../classes/cot-limites';
import { Color } from '../../classes/cot-colores';

@Component({
  selector: 'app-productos-agregar',
  templateUrl: './productos-agregar.component.html',
  styleUrl: './productos-agregar.component.css'
})
export class ProductosAgregarComponent {
  nuevoProducto = new Producto(
    '',          // f_registro
    '',          // status
    0,           // min_metro_cuadro
    0,           // costo_motor
    'no',        // motor
    '',          // color_default
    '',          // nombre
    '',          // tipo
  );

  limitesNProducto = new ProductoLimite(0, 0, 0, 0, 0, 0)

  limites = {
    ancho_min: 0,
    ancho_max: 0,
    alto_min: 0,
    alto_max: 0
  };

  colores: Color[] = [];
  coloresAplicados: string[] = [];
  //colores: { value: string }[] = [{ value: '' }];




  constructor(
    private cotizadorService: CotizadorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  agregarColor() {
    //this.colores.push({ value: '' });
    this.colores.push(new Color('', 0, undefined));
  }

  eliminarColor(index: number) {
    this.colores.splice(index, 1);
  }

  /*
  aplicarColores() {
  this.coloresAplicados = this.colores
    .map(c => c.trim())
    .filter(c => c.length > 0);

  // Si el color seleccionado ya no existe, lo limpias
  if (!this.coloresAplicados.includes(this.nuevoProducto.color_default)) {
    this.nuevoProducto.color_default = '';
  }
}*/


  guardarProducto() {
    const payload: any = {
      producto: this.nuevoProducto,
      limites: this.limitesNProducto,
      colores: this.colores.map(c => c.color.trim()).filter(c => c !== '')
    };

    this.cotizadorService.agregarProducto(payload).subscribe(() => {
      this.snackBar.open('Producto creado exitosamente', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/productos']);
    });
  }

}
