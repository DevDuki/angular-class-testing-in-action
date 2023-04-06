import { LlamaStateService } from './llama-state.service';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Llama } from '../../_types/llama.type';
import { LlamaRemoteService } from '../llama-remote/llama-remote.service';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { appRoutesNames } from '../../app.routes.names';
import { RouterAdapterService } from '../adapters/router-adapter/router-adapter.service';

describe('LlamaStateService', () => {
  let serviceUnderTest: LlamaStateService;
  let llamaRemoteServiceSpy: Spy<LlamaRemoteService>;
  let routerAdapterServiceSpy: Spy<RouterAdapterService>;
  let fakeLlamas: Llama[];
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        LlamaStateService,
        { provide: LlamaRemoteService, useValue: createSpyFromClass(LlamaRemoteService) },
        {
          provide: RouterAdapterService,
          useValue: createSpyFromClass(RouterAdapterService)
        }
      ]
    });

    serviceUnderTest = TestBed.inject(LlamaStateService);
    llamaRemoteServiceSpy = TestBed.inject<any>(LlamaRemoteService);
    routerAdapterServiceSpy = TestBed.inject<any>(RouterAdapterService);

    fakeLlamas = undefined;
    actualResult = undefined;
  });

  describe('METHOD: getFeaturedLlamas$', () => {
    Given(() => {
      fakeLlamas = [{ id: 'FAKE ID', name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' }];
      llamaRemoteServiceSpy.getLlamasFromServer.and.nextOneTimeWith(fakeLlamas);
    });

    When(() => {
      serviceUnderTest.getFeaturedLlamas$().subscribe(value => (actualResult = value));
    });

    Then(() => {
      expect(actualResult).toEqual(fakeLlamas);
    });
  });

  describe('METHOD: pokeLlama', () => {
    let fakeUserLlamaId: string;
    let fakeLlama: Llama;

    When(() => {
      serviceUnderTest.pokeLlama(fakeLlama);
    });

    describe('GIVEN user llama exists', () => {
      Given(() => {
        const userLlama = createDefaultFakeLlama();
        fakeUserLlamaId = 'FAKE USER LLAMA ID';
        userLlama.id = fakeUserLlamaId;

        // tslint:disable-next-line:no-string-literal
        serviceUnderTest['userLlamaSubject'].next(userLlama);
      });

      describe('GIVEN llama with a empty pokedBy list THEN add user llama to the list', () => {
        Given(() => {
          fakeLlama = createDefaultFakeLlama();
        });

        Then(() => {
          const expectedChanges: Partial<Llama> = {
            pokedByTheseLlamas: [fakeUserLlamaId]
          };
          expect(llamaRemoteServiceSpy.update).toHaveBeenCalledWith(
            fakeLlama.id,
            expectedChanges
          );
        });
      });

      describe('GIVEN llama with a filled pokedBy list THEN add user llama to the list', () => {
        Given(() => {
          fakeLlama = createDefaultFakeLlama();
          fakeLlama.pokedByTheseLlamas = ['ANOTHER FAKE ID'];
        });

        Then(() => {
          const expectedChanges: Partial<Llama> = {
            pokedByTheseLlamas: ['ANOTHER FAKE ID', fakeUserLlamaId]
          };
          expect(llamaRemoteServiceSpy.update).toHaveBeenCalledWith(
            fakeLlama.id,
            expectedChanges
          );
        });
      });
    });

    describe('GIVEN user llama is empty THEN redirect to login', () => {
      Then(() => {
        expect(routerAdapterServiceSpy.goToUrl).toHaveBeenCalledWith(
          `/${appRoutesNames.LOGIN}`
        );
      });
    });
  });

  describe('METHOD: loadUserLlama', () => {
    let fakeUserId: number;
    let expectedReturnedUserLlama: Llama;
    Given(() => {
      fakeUserId = 33333333;

      expectedReturnedUserLlama = createDefaultFakeLlama();
      expectedReturnedUserLlama.userId = fakeUserId;

      llamaRemoteServiceSpy.getByUserId
        .mustBeCalledWith(fakeUserId)
        .nextOneTimeWith(expectedReturnedUserLlama);

      serviceUnderTest.getUserLlama$().subscribe(result => (actualResult = result));
    });

    When(
      fakeAsync(() => {
        serviceUnderTest.loadUserLlama(fakeUserId);
      })
    );

    Then(() => {
      expect(actualResult).toEqual(expectedReturnedUserLlama);
    });
  });
});

function createDefaultFakeLlama(): Llama {
  return { id: 'FAKE ID', name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' };
}
