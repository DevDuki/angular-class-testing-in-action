import { FrontService } from './front.service';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Llama } from '../_types/llama.type';
import { LlamaRemoteService } from '../_services/llama-remote/llama-remote.service';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';

describe('FrontService', () => {

  let serviceUnderTest: FrontService;
  let llamaRemoteServiceSpy: Spy<LlamaRemoteService>;
  let fakeLlamas: Llama[];
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        FrontService,
        {provide: LlamaRemoteService, useValue: createSpyFromClass(LlamaRemoteService)}
      ]
    });

    serviceUnderTest = TestBed.get(FrontService);
    llamaRemoteServiceSpy = TestBed.get(LlamaRemoteService);

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

    Given(() => {
      fakeUserLlamaId = 'FAKE USER LLAMA ID';
      serviceUnderTest.userLlama = {
        ...fakeLlama,
        id: fakeUserLlamaId
      };
    });

    When(() => {
      serviceUnderTest.pokeLlama(fakeLlama);
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
});

function createDefaultLlama(): Llama {
  return {
    id: '1',
    name: 'FAKE NAME',
    imageFileName: 'FAKE IMAGE'
  };
}
