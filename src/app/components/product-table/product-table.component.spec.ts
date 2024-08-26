import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableComponent } from './product-table.component';
import { ProductService } from '../../service/product.service';
import { of } from 'rxjs';

const productServiceMock = {
  getProducts: jest.fn()
}

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTableComponent],
      providers: [{ provide: ProductService, useValue: productServiceMock }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    productServiceMock.getProducts.mockReturnValue(of({}))
    component = fixture.componentInstance;
  });

  it('should create', () => {
    productServiceMock.getProducts.mockReturnValue(of({}))
    expect(component).toBeTruthy();
  });

  it('should getProducts have been called', () => {
    component.ngOnInit()
    expect(productServiceMock.getProducts).toHaveBeenCalled();
  });

  it('should filterProduct succesfull', () => {
    component.products = [
      {
        "id": "1",
        "name": "Computadora",
        "description": "Descripción producto",
        "logo": "assets-1.png",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
      },
      {
        "id": "4",
        "name": "Televisor",
        "description": "Descripción producto",
        "logo": "assets-1.png",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
      },
    ];
    component.searchValue = 'Comp';
    component.searchProducts()
    expect(component.productsFiltered.length).toBe(1);
  });

  it('should filterProduct all', () => {
    component.products = [
      {
        "id": "1",
        "name": "Computadora",
        "description": "Descripción producto",
        "logo": "assets-1.png",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
      },
      {
        "id": "4",
        "name": "Televisor",
        "description": "Descripción producto",
        "logo": "assets-1.png",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
      },
    ];
    component.searchValue = '';
    component.searchProducts()
    expect(component.productsFiltered.length).toBe(2);
  });

  it('should filterProduct anything', () => {
    component.products = [
      {
        "id": "1",
        "name": "Computadora",
        "description": "Descripción producto",
        "logo": "assets-1.png",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
      },
      {
        "id": "4",
        "name": "Televisor",
        "description": "Descripción producto",
        "logo": "assets-1.png",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
      },
    ];
    component.searchValue = 'per';
    component.searchProducts()
    expect(component.productsFiltered.length).toBe(0);
  });


});
