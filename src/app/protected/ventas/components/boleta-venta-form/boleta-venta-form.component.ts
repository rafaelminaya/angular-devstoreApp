import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/protected/consignaciones/interfaces/producto.interface';
import { BoletaVenta } from '../../interfaces/boleta-venta-interface';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-boleta-venta-form',
  templateUrl: './boleta-venta-form.component.html',
  styles: [
    `
      .info-box {
        cursor: pointer;
      }
    `,
  ],
})
export class BoletaVentaFormComponent implements OnInit {
  // PROPIEDADES
  @Input()
  productosBuscados: Producto[] = [];

  @Input()
  prodductosSeleccionados: Producto[] = [];

  @Input()
  productoSelected!: Producto;

  @Output()
  onProductoSelected: EventEmitter<number> = new EventEmitter<number>();
  // propiedades para la búsqueda de productos
  @ViewChild('txtBuscarProducto')
  txtbuscar!: ElementRef<HTMLInputElement>;
  debouncer: Subject<string> = new Subject();

  @Input() labelSubmit = '';
  @Input()
  set model(model: BoletaVenta) {
    if (!model) {
      return;
    }
    console.log('set model', model);

    //patchValue(): Para enviar más atributos de lo que el modelo espera.
    this.formBoletaVenta.patchValue(model);
  }

  @Output() onSubmit: EventEmitter<BoletaVenta> =
    new EventEmitter<BoletaVenta>();

  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  formBoletaVenta: FormGroup = this.fb.group({
    numero: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    numeroDocumento: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
    ],
    direccion: ['', [Validators.minLength(3), Validators.maxLength(255)]],
  });

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {}

  // MÉTODOS
  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe((valorTermino) => {
      console.log('debouncer: ', valorTermino);
      // Emitimos el valor obtenido hacia el template por medio de la propiedad/evento "onDebounce".
      this.onDebounce.emit(valorTermino);
    });
  }

  actualizarCantidad(productoId: number, event: any): void {}

  actualizarPrecioVenta(productoId: number, event: any): void {}

  eliminarDetalle(producto: Producto) {}

  teclaPresionada() {
    const termino: string = this.txtbuscar.nativeElement.value;

    if (termino.trim().length === 0) {
      return;
    }

    this.debouncer.next(termino);
  }

  productoBox(id: number) {
    console.log('evento', id);
    this.onProductoSelected.emit(id);
  }

  submitForm() {
    if (this.formBoletaVenta.invalid) {
      // markAllAsTouched() : Método que toca /touch todos los campos del formulario, disparando las validaciones con "touched"
      this.formBoletaVenta.markAllAsTouched();
      return;
    }
    this.onSubmit.emit(this.formBoletaVenta.value);
  }

  cancelForm() {
    this.onCancel.emit();
  }

  campoNoValido(campo: string) {
    return (
      this.formBoletaVenta.get(campo)?.invalid &&
      this.formBoletaVenta.get(campo)?.touched
    );
  }
}
