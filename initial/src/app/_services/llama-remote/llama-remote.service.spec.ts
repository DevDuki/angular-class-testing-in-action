import { TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { LlamaRemoteService, LLAMAS_REMOTE_PATH } from './llama-remote.service';
import { Llama } from '../../_types/llama.type';
import { HttpClient } from '@angular/common/http';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';

describe('AnotherService', () => {
  let serviceUnderTest: LlamaRemoteService;
  let httpSpy: Spy<HttpClient>;
  let httpAdapterServiceSpy: Spy<HttpAdapterService>
  let fakeLlamas: Llama[];
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        LlamaRemoteService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
        { provide: HttpAdapterService, useValue: createSpyFromClass(HttpAdapterService) }
      ]
    });

    serviceUnderTest = TestBed.inject(LlamaRemoteService);

    httpSpy = TestBed.get(HttpClient);
    httpAdapterServiceSpy = TestBed.inject(HttpAdapterService) as Spy<HttpAdapterService>;

    fakeLlamas = undefined;
    actualResult = undefined;
  });

  describe('METHOD: getLlamasFromServer', () => {

    When(() => {
      serviceUnderTest.getLlamasFromServer().subscribe(value => actualResult = value);
    });

    describe('GIVEN a successful request THEN return the llamas', () => {
      Given(() => {
        fakeLlamas = [{ id: '1', name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' }];
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
    let actualError: any;
    let errorIsExpected: boolean;

    Given(() => {
      errorIsExpected = false;
    });

    When(async () => {
      try {
        actualResult = await  serviceUnderTest.update(fakeLlamaIdArg, fakeLlamaChangesArg);
      } catch (error) {
        if (!errorIsExpected) {
          throw error;
        }
        actualError = error;
      }
    });

    describe('GIVEN update was successful THEN return the updated llama', () => {
      let expectedReturnedLlama: Llama;

      Given(() => {
        /**
         * Since we have mocked this method (update) in the front.service.spec.ts file, we are using the same value as we used there to
         * sort of "simulate" and integrated test. This might look a bit cumbersome to do and seems a bit redundant, but it is a good way
         * to make sure that both tests succeed with the exact same data. It is not a MUST-DO, but it surely has its benefits.
         */
        fakeLlamaIdArg = 'FAKE ID';
        fakeLlamaChangesArg = {
          pokedByTheseLlamas: ['FAKE USER LLAMA ID']
        };

        expectedReturnedLlama = createDefaultLlama();
        expectedReturnedLlama.id = fakeLlamaIdArg;
        expectedReturnedLlama.pokedByTheseLlamas = fakeLlamaChangesArg .pokedByTheseLlamas;

        const expectedUrl = `${LLAMAS_REMOTE_PATH }/${fakeLlamaIdArg}`
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
         httpAdapterServiceSpy.patch.and.rejectWith( 'FAKE ERROR');
         errorIsExpected = true;
       });

       Then(() => {
         expect(actualError).toEqual('FAKE ERROR');
       });
    });
  });
});

function createDefaultLlama(): Llama {
  return {
    id: '1',
    name: 'FAKE NAME',
    imageFileName: 'FAKE IMAGE'
  };
}
