import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../../service/product.service';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const productServiceMock = {
  validateId: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  product: null,
}

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      providers: [{ provide: ProductService, useValue: productServiceMock }],
      imports: [FormsModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    productServiceMock.updateProduct.mockReturnValue(of({}))
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not create product', () => {
    component.onSubmit()
    expect(productServiceMock.createProduct).toHaveBeenCalledTimes(0);
  });

  // it('should create product', () => {
  //   component.ngOnInit();
  //   component.registroForm.get('id')?.setValue('tres');
  //   component.registroForm.get('name')?.setValue('refrigeradora');
  //   component.registroForm.get('description')?.setValue('prueba');
  //   component.registroForm.get('logo')?.setValue('test');
  //   component.registroForm.get('date_release')?.setValue('2024-09-20');
  //   component.onSubmit();
  //   expect(productServiceMock.createProduct).toHaveBeenCalledTimes(1);
  // });

  it('should update product', () => {
    component.product = {
      "id": "3",
      "name": "Computadora",
      "description": "Descripción producto",
      "logo": "assets-1.png",
      "date_release": "2025-01-01",
      "date_revision": "2025-01-01"
    };
    component.editMode = true;
    component.ngOnInit()
    component.onSubmit()
    expect(productServiceMock.updateProduct).toHaveBeenCalledTimes(1);
  });
});
