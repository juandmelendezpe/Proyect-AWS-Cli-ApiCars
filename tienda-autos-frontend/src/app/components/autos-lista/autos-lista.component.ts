import { Component, OnInit } from '@angular/core';
import { Auto } from '../../models/auto.model';
import { AutoService } from '../../services/auto.service';

@Component({
  selector: 'app-autos-lista',
  templateUrl: './autos-lista.component.html',
  styleUrls: ['./autos-lista.component.scss']
})
export class AutosListaComponent implements OnInit {
  autos: Auto[] = [];
  loading = false;
  error = '';

  constructor(private autoService: AutoService) {}

  ngOnInit(): void {
    this.cargarAutos();
  }

  cargarAutos(): void {
    this.loading = true;
    this.autoService.getAutos().subscribe({
      next: (data) => {
        this.autos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los autos';
        this.loading = false;
        console.error(err);
      }
    });
  }

  eliminarAuto(id: string): void {
    if (confirm('¿Estás seguro de eliminar este auto?')) {
      this.autoService.deleteAuto(id).subscribe({
        next: () => {
          this.cargarAutos();
        },
        error: (err) => {
          this.error = 'Error al eliminar el auto';
          console.error(err);
        }
      });
    }
  }
}
