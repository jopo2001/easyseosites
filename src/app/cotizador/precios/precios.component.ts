import { Component, OnInit } from '@angular/core';
import { CotizadorService } from '../../cotizador.service';
import { Region } from '../../classes/cot-regiones';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  productos: any[] = [];
  precios: any[] = [];
  regiones: Region[] = [];
  regionSeleccionada: number = 0;

  constructor(private cotizadorService: CotizadorService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.obtenerRegiones();
    this.cargarProductos();
  }

  obtenerRegiones(): void {
    this.cotizadorService.getRegiones().subscribe(data => {
      console.log('>>> Regiones recibidas:', data); // DEBUG
      this.regiones = data;
      if (this.regiones.length > 0) {
        this.regionSeleccionada = this.regiones[0].id!;
        this.cargarPrecios();
      }
    });
  }

  cargarProductos(): void {
    this.cotizadorService.getProductos().subscribe(productos => {
      console.log('>>> Productos recibidos:', productos); // DEBUG
      this.productos = productos;
      if (this.regionSeleccionada) {
        this.cargarPrecios();
      }
    });
  }

  cargarPrecios(): void {
    this.cotizadorService.getPrecios(this.regionSeleccionada).subscribe(precios => {
      console.log('>>> Precios recibidos:', precios); // DEBUG

      const preciosMap = new Map<string, number>();
      precios.forEach((p: { nombre: string, precio_m2: number | string }) => {
        preciosMap.set(p.nombre, Number(p.precio_m2)); // Convertimos a number por si viene como string
      });

      this.precios = this.productos.map(prod => ({
        id: prod.id,
        nombre: prod.nombre,
        tipo: prod.tipo, // ✅ agregado
        precio_m2: preciosMap.get(prod.nombre) ?? 0
      }));

      console.log('>>> Mapeo final productos + precios:', this.precios);
    });
  }

  guardarPrecio(precio: any): void {
    const data = {
      producto_id: precio.id,
      region_id: this.regionSeleccionada,
      precio_m2: precio.precio_m2
    };

    this.cotizadorService.guardarPrecio(data).subscribe(res => {
      if (res.success) {
        this.snackBar.open('Precio guardado con éxito.', 'Cerrar', {
          duration: 3000, // milisegundos
        });
      } else {
        alert('Error al guardar precio: ' + (res.error || 'Desconocido'));
      }
    });
  }

}
