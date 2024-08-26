import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ProductVO } from '../../vo/ProductVO';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private route: Router,
  ) { }

  product: ProductVO | null = null;
  editMode = false;

  ngOnInit(): void {
    if (this.service.product !== null) {
      this.product = this.service.product;
      this.editMode = true;
      console.log("PROD: ", this.product)
    }
    this.registroForm = this.fb.group({
      id: [{ value: this.editMode ? this.product!.id : '', disabled: this.editMode }, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)], asyncValidators :[this.idValidator()]}],
      //id: [{ value: this.editMode ? this.product!.id : '', disabled: this.editMode }, [Validators.required, Validators.minLength(3), Validators.maxLength(10), this.idValidator()]],
      name: [this.editMode ? this.product!.name : '', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [this.editMode ? this.product!.description : '', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [this.editMode ? this.product!.logo : '', Validators.required],
      date_release: [this.editMode ? this.product!.date_release : '', [Validators.required, this.deateReleaseValidator()]],
      date_revision: [{ value: this.editMode ? this.product!.date_revision : '', disabled: true }]
    });

    this.registroForm.get('date_release')?.valueChanges.subscribe(value => {
      this.registroForm.get('date_revision')?.setValue(this.calculateRevisionDate(value));
    });

  }

  get id() {
    return this.registroForm.get('id');
  }

  get name() {
    return this.registroForm.get('name');
  }

  get description() {
    return this.registroForm.get('description');
  }

  get logo() {
    return this.registroForm.get('logo');
  }

  get date_release() {
    return this.registroForm.get('date_release');
  }

  calculateRevisionDate(date_release: string): string {
    let date = new Date(date_release);
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().substring(0, 10);
  }

  deateReleaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date_release = new Date(control.value);
      const currentDate = new Date();

      if (date_release < currentDate) {
        return { 'dateReleaseInvalid': true };
      }
      return null;
    }
  }

  idValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.service.validateId(control.value).pipe(
        map(res => res ? { 'idInvalid': true } : null)
      );
    }
  }

  resetForm() {
    if(this.editMode){
      this.registroForm.get('name')?.reset()
      this.registroForm.get('description')?.reset()
      this.registroForm.get('logo')?.reset()
      this.registroForm.get('date_release')?.reset()
      this.registroForm.get('date_revision')?.reset()
    }else{
      this.registroForm.reset();
    }
  }

  onSubmit() {
    if (this.registroForm.valid) {
      let product = { ...this.registroForm.value }
      product.date_revision = this.registroForm.get('date_revision')?.value
      if (this.editMode) {
        this.service.updateProduct(this.registroForm.get('id')?.value, product).subscribe(res => {
          alert("El producto se actualizo con exito")
          this.route.navigate([""]);
        }, e => {
          alert("No se pudo actualizar el producto")
        })
      } else {
        this.service.createProduct(product).subscribe(res => {
          alert("El producto se creo con exito")
          this.route.navigate([""]);
        }, e => {
          alert("No se pudo crear el producto")
        })
      }
    }
  }

}
