import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CotizadorService } from '../../cotizador.service';
import { Region } from '../../classes/cot-regiones';

@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.component.html',
  styleUrl: './regiones.component.css'
})
export class RegionesComponent implements OnInit {
  regiones: Region[] = [];
  nuevaRegion = '';
  editandoId: number | null = null;
  regionEditada = '';
  mostrarFormulario = false;

  constructor(
    private cotizadorService: CotizadorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarRegiones();
  }

  cargarRegiones() {
    this.cotizadorService.getRegiones().subscribe(data => {
      this.regiones = data;
      console.log('Data', data)
    });
  }

  guardarNuevaRegion() {
    if (!this.nuevaRegion.trim()) return;

    this.cotizadorService.agregarRegion(this.nuevaRegion).subscribe(() => {
      this.snackBar.open('Región agregada con éxito', 'Cerrar', { duration: 3000 });
      this.nuevaRegion = '';
      this.mostrarFormulario = false;
      this.cargarRegiones();
    });
  }

  eliminarRegion(id: number) {
    if (!confirm('¿Estás seguro de eliminar esta región?')) return;

    this.cotizadorService.eliminarRegion(id).subscribe(() => {
      this.snackBar.open('Región eliminada', 'Cerrar', { duration: 3000 });
      this.cargarRegiones();
    });
  }

  editarRegion(region: any) {
    this.editandoId = region.id;
    this.regionEditada = region.nombre;
  }

 guardarEdicion(region: any) {
  if (!this.regionEditada.trim()) return;

  region.nombre = this.regionEditada; // ✅ Asegura que el nombre enviado sea el editado

  this.cotizadorService.editarRegion(region).subscribe(() => {
    this.snackBar.open('Región actualizada', 'Cerrar', { duration: 3000 });
    this.editandoId = null;
    this.regionEditada = '';

// 🟢 Usa setTimeout para dar tiempo al DOM antes de recargar
    setTimeout(() => {
      this.cargarRegiones();
    }, 100); 
  });
}


  cancelarEdicion() {
    this.editandoId = null;
    this.regionEditada = '';
  }
}