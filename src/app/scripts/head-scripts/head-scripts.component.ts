import { Component, OnInit } from '@angular/core';
import { ScriptsHead } from '../../classes/confGenerales';
import { GralService } from '../../servicios/gral.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-head-scripts',
  templateUrl: './head-scripts.component.html',
  styleUrl: './head-scripts.component.css'
})
export class HeadScriptsComponent implements OnInit {
  scripts: ScriptsHead[] = [];
  cargando = false;

  constructor(private gralService: GralService) {}

  ngOnInit(): void {
    this.obtenerScripts();
  }

  obtenerScripts(): void {
    this.cargando = true;
    this.gralService.getScriptsHead().subscribe({
      next: (data) => {
        this.scripts = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  eliminarScript(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el script permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gralService.deleteScriptHead(id).subscribe({
          next: () => {
            this.scripts = this.scripts.filter(s => s.id !== id);
            Swal.fire('Eliminado', 'El script ha sido eliminado.', 'success');
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error', 'No se pudo eliminar el script.', 'error');
          }
        });
      }
    });
  }
}