import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

const productListMock = 
  {
    "data": [
        {
            "id": "1",
            "name": "Nombre producto test",
            "description": "Descripción producto",
            "logo": "assets-1.png",
            "date_release": "2025-01-01",
            "date_revision": "2025-01-01"
        },
        {
            "id": "2",
            "name": "Nombre producto test 2",
            "description": "Descripción producto",
            "logo": "assets-1.png",
            "date_release": "2025-01-01",
            "date_revision": "2025-01-01"
        },
        {
            "id": "3",
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
        {
            "id": "5",
            "name": "Nombre producto",
            "description": "Descripción producto",
            "logo": "assets-1.png",
            "date_release": "2025-01-01",
            "date_revision": "2025-01-01"
        },
        {
            "id": "6",
            "name": "Nombre producto",
            "description": "Descripción producto",
            "logo": "assets-1.png",
            "date_release": "2025-01-01",
            "date_revision": "2025-01-01"
        },
        {
            "id": "tres",
            "name": "Nombre producto",
            "description": "Descripción producto",
            "logo": "assets-1.png",
            "date_release": "2025-01-01",
            "date_revision": "2025-01-01"
        },
        {
            "id": "hola",
            "name": "Brandon",
            "description": "asdsfafsaf",
            "logo": "asd",
            "date_release": "2024-08-25",
            "date_revision": "2025-08-25"
        }
    ]
};

const httpClientMock = {
  get: jest.fn()
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        {provide: HttpClient, useValue: httpClientMock}
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('getProduct http have been called', () => {
    service.getProducts()
    expect(httpClientMock.get).toHaveBeenCalled();
  });

  it('getProduct retrun', (done) => {
    httpClientMock.get.mockReturnValue(of(productListMock));
    service.getProducts().subscribe( res => {
      expect(res.data.length).toBe(8);
      done();
    })
  });

});
