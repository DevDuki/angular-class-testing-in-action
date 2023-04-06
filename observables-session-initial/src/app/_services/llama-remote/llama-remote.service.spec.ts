import { TestBed, fakeAsync } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { LlamaRemoteService, LLAMAS_REMOTE_PATH } from './llama-remote.service';
import { Llama } from '../../_types/llama.type';
import { HttpClient } from '@angular/common/http';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';

describe('LlamaRemoteService', () => {
  let serviceUnderTest: LlamaRemoteService;
  let httpSpy: Spy<HttpClient>;
  let httpAdapterServiceSpy: Spy<HttpAdapterService>;

  let fakeLlamas: Llama[];
  let actualResult: any;
  let actualError: any;
  let expectedReturnedLlama: Llama;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        LlamaRemoteService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
        { provide: HttpAdapterService, useValue: createSpyFromClass(HttpAdapterService) },
      ]
    });

    serviceUnderTest = TestBed.get(LlamaRemoteService);
    httpSpy = TestBed.get(HttpClient);
    httpAdapterServiceSpy = TestBed.inject<any>(HttpAdapterService);

    fakeLlamas = undefined;
    actualResult = undefined;
    actualError = undefined;
    expectedReturnedLlama = undefined;
  });

  describe('METHOD: getLlamasFromServer', () => {

    When(() => {
      serviceUnderTest.getLlamasFromServer().subscribe(value => actualResult = value);
    });

    describe('GIVEN a successful request THEN return the llamas', () => {
      Given(() => {
        fakeLlamas = [{id: 'FAKE ID', name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' }];
        httpSpy.get.and.nextOneTimeWith(fakeLlamas);
        
      });
      Then(() => {
        expect(actualResult).toEqual(fakeLlamas);
      });
    });

  });

  describe('METHOD: update', () => {
    let fakeLlamaIdArg: string;
    let fakeLlamaChangesArg: Partial<Llama>;
    let errorIsExpected: boolean;

    Given(() => {
      errorIsExpected = false;
    });
    

    When(fakeAsync(async () => {
      try {
        actualResult = await serviceUnderTest.update(fakeLlamaIdArg, fakeLlamaChangesArg);  
      } catch (error) {
        if (!errorIsExpected) {
          throw error;
        }
        actualError = error;
      }
    }));

    describe('Given update was successful THEN return the updated llama', () => {

      Given(() => {
        fakeLlamaIdArg = 'FAKE ID';
        fakeLlamaChangesArg = {
          pokedByTheseLlamas: ['FAKE USER LLAMA ID']
        };

        expectedReturnedLlama = createDefaultFakeLlama();
        expectedReturnedLlama.id = fakeLlamaIdArg;
        expectedReturnedLlama.pokedByTheseLlamas = ['FAKE USER LLAMA ID'];

        const expectedUrl = `${LLAMAS_REMOTE_PATH}/${fakeLlamaIdArg}`;
        httpAdapterServiceSpy.patch
          .mustBeCalledWith(expectedUrl, fakeLlamaChangesArg)
          .resolveWith(expectedReturnedLlama);
      });

      Then(() => {
        expect(actualResult).toEqual(expectedReturnedLlama);
      });
    });

    describe('GIVEN update failed THEN rethrow the error', () => {
      Given(() => {
        errorIsExpected = true;
        httpAdapterServiceSpy.patch.and.rejectWith('FAKE ERROR');
      });

      Then(() => {
        expect(actualError).toEqual('FAKE ERROR');
      });

    });
  });

  describe('METHOD: create', () => {
    let fakeBasicLlamaDetails: Partial<Llama>;
    
    Given(() => {
      fakeBasicLlamaDetails = {
        name: 'FAKE NAME',
        imageFileName: 'FAKE IMAGE FILE NAME',
        userId: 333333
      };

      expectedReturnedLlama = {
        ...expectedReturnedLlama,
        id: 'FAKE ID',
        ...fakeBasicLlamaDetails
      };

      httpAdapterServiceSpy.post
        .mustBeCalledWith(LLAMAS_REMOTE_PATH, fakeBasicLlamaDetails)
        .resolveWith(expectedReturnedLlama);
    });

    When(fakeAsync(async () => {
      actualResult = await serviceUnderTest.create(fakeBasicLlamaDetails);
    }));

    Then(() => {
      expect(actualResult).toEqual(expectedReturnedLlama);
    });
    
  });

  describe('METHOD: getByUserId', () => {
    let fakeUserId: number;
    let expectedReturnedUserLlama: Llama;

    Given(() => {
      fakeUserId = 33333333;

      expectedReturnedUserLlama = createDefaultFakeLlama();
      expectedReturnedUserLlama.userId = fakeUserId;

      const url = LLAMAS_REMOTE_PATH + '?userId=' + fakeUserId;

      httpAdapterServiceSpy.get.mustBeCalledWith(url)
        .nextOneTimeWith([expectedReturnedUserLlama]);
    });

    When(() => {
      serviceUnderTest.getByUserId(fakeUserId)
        .subscribe(result => actualResult = result);
    });

    Then(() => {
      expect(actualResult).toEqual(expectedReturnedUserLlama);
    });

  });
});


function createDefaultFakeLlama(): Llama {
  return { id: 'FAKE ID', name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' };
}