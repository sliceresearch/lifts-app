import { TestBed, inject } from '@angular/core/testing';

import { AppXService } from './appx.service';

describe('AppXService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppXService]
    });
  });

  it('should be created', inject([AppXService], (service: AppXService) => {
    expect(service).toBeTruthy();
  }));
});
