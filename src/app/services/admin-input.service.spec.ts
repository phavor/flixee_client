import { TestBed, inject } from '@angular/core/testing';

import { AdminInputService } from './admin-input.service';

describe('AdminInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminInputService]
    });
  });

  it('should be created', inject([AdminInputService], (service: AdminInputService) => {
    expect(service).toBeTruthy();
  }));
});
