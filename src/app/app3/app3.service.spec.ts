import { TestBed, inject } from '@angular/core/testing';

import { App3Service } from './app3.service';

describe('App3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [App3Service]
    });
  });

  it('should be created', inject([App3Service], (service: App3Service) => {
    expect(service).toBeTruthy();
  }));
});
