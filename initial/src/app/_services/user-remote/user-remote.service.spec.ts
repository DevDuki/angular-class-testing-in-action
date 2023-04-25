import { TestBed } from '@angular/core/testing';

import { UserRemoteService } from './user-remote.service';

describe('UserRemoteService', () => {
  let service: UserRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
