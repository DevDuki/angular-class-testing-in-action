import { FrontService } from './front.service';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Llama } from '../_types/llama.type';
import { LlamaRemoteService } from '../_services/llama-remote/llama-remote.service';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { appRoutesNames } from '../app.routes.names';
import { RouterAdapterService } from '../_services/adapters/router-adapter/router-adapter.service';

describe('FrontService', () => {

  let serviceUnderTest: FrontService;
  let llamaRemoteServiceSpy: Spy<LlamaRemoteService>;
  let routerAdapterServiceSpy: Spy<RouterAdapterService>;
  let fakeLlamas: Llama[];
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        FrontService,
        { provide: LlamaRemoteService, useValue: createSpyFromClass(LlamaRemoteService) },
        { provide: RouterAdapterService, useValue: createSpyFromClass(RouterAdapterService) }
      ]
    });

    serviceUnderTest = TestBed.inject(FrontService);
    llamaRemoteServiceSpy = TestBed.inject(LlamaRemoteService) as Spy<LlamaRemoteService>;
    routerAdapterServiceSpy = TestBed.inject(RouterAdapterService) as Spy<RouterAdapterService>;

    fakeLlamas = undefined;
    actualResult = undefined;
  });

  describe('METHOD: getFeaturedLlamas', () => {

    Given(() => {
      fakeLlamas = [{ id: '1', name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' }];
      llamaRemoteServiceSpy.getLlamasFromServer.and.nextOneTimeWith(fakeLlamas);
    });

    When(fakeAsync( async () => {
      actualResult = await serviceUnderTest.getFeaturedLlamas();
    }));

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
        fakeUserLlamaId = 'FAKE USER LLAMA ID';
        serviceUnderTest.userLlama = {
          ...fakeLlama,
          id: fakeUserLlamaId
        };
      });

      describe('GIVEN llama with an undefined pokedBy list THEN add user llama to the list',() => {
        Given(() => {
          fakeLlama = createDefaultLlama();
        });

        Then(() => {
          const expectedChanges: Partial<Llama> = {
            pokedByTheseLlamas: [fakeUserLlamaId]
          };
          expect(llamaRemoteServiceSpy.update).toHaveBeenCalledWith(fakeLlama.id, expectedChanges);
        });
      });

      describe('GIVEN llama with a defined pokedBy list THEN add user llama to the list',() => {
        Given(() => {
          fakeLlama = createDefaultLlama();
          fakeLlama.pokedByTheseLlamas = ['ANOTHER FAKE ID'];
        });

        Then(() => {
          const expectedChanges: Partial<Llama> = {
            pokedByTheseLlamas: ['ANOTHER FAKE ID', fakeUserLlamaId]
          };
          expect(llamaRemoteServiceSpy.update).toHaveBeenCalledWith(fakeLlama.id, expectedChanges);
        });
      });
    });

    describe('GIVEN user llama does NOT exist THEN redirect to login', () => {
      Given(() => {
        serviceUnderTest.userLlama = null;
      });

      Then(() => {
        expect(routerAdapterServiceSpy.goToUrl).toHaveBeenCalledWith(`/${appRoutesNames.LOGIN}`);
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
