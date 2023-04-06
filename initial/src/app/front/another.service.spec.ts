import { TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { AnotherService } from './another.service';
import { Llama } from './llama.model';
import { HttpClient } from '@angular/common/http';

describe('AnotherService', () => {
  let serviceUnderTest: AnotherService;
  let httpSpy: Spy<HttpClient>;
  let fakeLlamas: Llama[];
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        AnotherService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });

    serviceUnderTest = TestBed.get(AnotherService);
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
        fakeLlamas = [{ name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' }];
        httpSpy.get.and.nextOneTimeWith(fakeLlamas);
        
      });
      Then(() => {
        expect(actualResult).toEqual(fakeLlamas);
      });
    });

  });
});
