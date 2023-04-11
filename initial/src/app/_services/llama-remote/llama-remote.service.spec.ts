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
    let fakeLlamaId: string;
    let fakeLlamaChanges: Partial<Llama>;

    Given(() => {
      /**
       * Since we have mocked this method (update) in the front.service.spec.ts file, we are using the same value as we used there to
       * sort of "simulate" and integrated test. This might look a bit cumbersome to do and seems a bit redundant, but it is a good way
       * to make sure that both tests succeed with the exact same data. It is not a MUST-DO, but it surely has its benefits.
       */
      fakeLlamaId = 'FAKE ID';
      fakeLlamaChanges = {
        pokedByTheseLlamas: ['FAKE USER LLAMA ID']
      };
    });

    When(() => {
      serviceUnderTest.update(fakeLlamaId, fakeLlamaChanges);
    });

    Then(() => {
      const expectedUrl = `${LLAMAS_REMOTE_PATH }/${fakeLlamaId}`
      expect(httpAdapterServiceSpy.patch).toHaveBeenCalledWith(expectedUrl, fakeLlamaChanges);
    });
  });
});
