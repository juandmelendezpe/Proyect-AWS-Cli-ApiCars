import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auto } from '../../models/auto.model';
import { AutoService } from '../../services/auto.service';

@Component({
  selector: 'app-auto-detalle',
  templateUrl: './auto-detalle.component.html',
  styleUrls: ['./auto-detalle.component.scss']
})
export class AutoDetalleComponent implements OnInit {
  auto: Auto | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private autoService: AutoService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.autoService.getAuto(id).subscribe({
        next: (data) => {
          this.auto = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar el auto';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  eliminarAuto(): void {
    if (this.auto && this.auto.id && confirm('¿Estás seguro de eliminar este auto?')) {
      this.autoService.deleteAuto(this.auto.id).subscribe({
        next: () => {
          this.router.navigate(['/autos']);
        },
        error: (err) => {
          this.error = 'Error al eliminar el auto';
          console.error(err);
        }
      });
    }
  }
}
