import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllNameservers', () => {
    it('should return expected nameservers', () => {
      service.getAllNameservers().subscribe((res) => {
        expect(res.length).toBe(2);
        expect(res).toEqual([
          { name: 'ns1', ipAddress: '1.1.1.1' },
          { name: 'ns2', ipAddress: '2.2.2.2' },
        ]);
      });

      const req = httpMock.expectOne(`http://localhost:3000/nameservers`);
      expect(req.request.method).toBe('GET');
      req.flush([
        { name: 'ns1', ipAddress: '1.1.1.1' },
        { name: 'ns2', ipAddress: '2.2.2.2' },
      ]);
    });
  });

  describe('addNameserver', () => {
    it('should make expected POST request', () => {
      const nameserver = {
        name: 'ns3',
        ipAddress: '3.3.3.3',
      };

      service.addNameserver(nameserver).subscribe();

      const req = httpMock.expectOne(`http://localhost:3000/nameservers`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(nameserver);
    });
  });
});
