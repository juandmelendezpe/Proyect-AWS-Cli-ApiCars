import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auto } from '../../models/auto.model';
import { AutoService } from '../../services/auto.service';

@Component({
  selector: 'app-auto-form',
  templateUrl: './auto-form.component.html',
  styleUrls: ['./auto-form.component.scss']
})
export class AutoFormComponent implements OnInit {
  autoForm!: FormGroup;
  isEditing = false;
  autoId = '';
  loading = false;
  error = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private autoService: AutoService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Verificar si estamos en modo edición
    this.autoId = this.route.snapshot.paramMap.get('id') || '';
    if (this.autoId) {
      this.isEditing = true;
      this.loading = true;
      this.autoService.getAuto(this.autoId).subscribe({
        next: (auto) => {
          this.autoForm.patchValue(auto);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los datos del auto';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  initForm(): void {
    this.autoForm = this.fb.group({
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      color: ['', [Validators.required]],
      kilometraje: ['', [Validators.required, Validators.min(0)]],
      disponible: [true]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.autoForm.invalid) {
      return;
    }
    
    const auto: Auto = this.autoForm.value;
    
    if (this.isEditing) {
      this.autoService.updateAuto(this.autoId, auto).subscribe({
        next: () => {
          this.router.navigate(['/autos', this.autoId]);
        },
        error: (err) => {
          this.error = 'Error al actualizar el auto';
          console.error(err);
        }
      });
    } else {
      this.autoService.createAuto(auto).subscribe({
        next: (newAuto) => {
          this.router.navigate(['/autos', newAuto.id]);
        },
        error: (err) => {
          this.error = 'Error al crear el auto';
          console.error(err);
        }
      });
    }
  }

  get f() { return this.autoForm.controls; }
}
