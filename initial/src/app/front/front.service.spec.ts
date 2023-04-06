import { FrontService } from './front.service';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Llama } from './llama.model';
import { AnotherService } from './another.service';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';

describe('FrontService', () => {
  
  let serviceUnderTest: FrontService;
  let anotherServiceSpy: Spy<AnotherService>;
  let fakeLlamas: Llama[];
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        FrontService,
        {provide: AnotherService, useValue: createSpyFromClass(AnotherService)}
      ]
    });

    serviceUnderTest = TestBed.get(FrontService);
    anotherServiceSpy = TestBed.get(AnotherService);

    fakeLlamas = undefined;
    actualResult = undefined;
  });

  describe('METHOD: getFeaturedLlamas', () => {

    Given(() => {
      fakeLlamas = [{ name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' }];
      anotherServiceSpy.getLlamasFromServer.and.nextOneTimeWith(fakeLlamas);
    });

    When(fakeAsync( async () => {
      actualResult = await serviceUnderTest.getFeaturedLlamas();
    }));

    Then(() => {
      expect(actualResult).toEqual(fakeLlamas);
    });
    
    
  });
  
});