import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

 
  formulario: FormGroup;

  constructor(private fb: FormBuilder){
    this.formulario = this.fb.group({
      nombre: ['',[Validators.required,Validators.pattern('^[a-zA-z ]+$')]],
      apellido: ['',[Validators.required,Validators.pattern('^[a-zA-z ]+$')]],
      fechaNacimiento: [Validators.required, this.validarMayorEdad]
    }); 
  }

  validarMayorEdad(control: any){
    const fechaIng = new Date(control.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaIng.getFullYear();
    return edad >= 18 ? null :{ menorDeEdad: true};
  }

  enviar() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      
    }
  }
    // Getter para los controles del formulario
    get nombre() {
      return this.formulario.get('nombre');
    }
  
    get apellido() {
      return this.formulario.get('apellido');
    }
  
    get fechaNacimiento() {
      return this.formulario.get('fechaNacimiento');
    }
}
