import { TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { LlamaRemoteService } from './llama-remote.service';
import { Llama } from '../../_types/llama.type';
import { HttpClient } from '@angular/common/http';

describe('AnotherService', () => {
  let serviceUnderTest: LlamaRemoteService;
  let httpSpy: Spy<HttpClient>;
  let fakeLlamas: Llama[];
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        LlamaRemoteService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });

    serviceUnderTest = TestBed.get(LlamaRemoteService);
    httpSpy = TestBed.get(HttpClient);

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
});
