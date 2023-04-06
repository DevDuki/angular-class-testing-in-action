import { TestBed, fakeAsync } from '@angular/core/testing';
import { FrontComponent } from './front.component';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Llama } from '../_types/llama.type';
import { LlamaStateService } from '../_services/llama-state/llama-state.service';

describe('FrontComponent', () => {
  let componentUnderTest: FrontComponent;
  let actualResult: any;
  let llamaStateServiceSpy: Spy<LlamaStateService>;
  let fakeLlamas: Llama[];

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        FrontComponent,
        { provide: LlamaStateService, useValue: createSpyFromClass(LlamaStateService) }
      ]
    });

    componentUnderTest = TestBed.get(FrontComponent);
    llamaStateServiceSpy = TestBed.get(LlamaStateService);

    fakeLlamas = undefined;
  });

  describe('INIT', () => {
    When(
      fakeAsync(() => {
        componentUnderTest.ngOnInit();
      })
    );

    describe('GIVEN featured llamas emit THEN verify local subscription', () => {
      Given(() => {
        fakeLlamas = [createDefaultFakeLlama()];

        llamaStateServiceSpy.getFeaturedLlamas$.and.nextOneTimeWith(fakeLlamas);
      });

      When(() => {
        componentUnderTest.featuredLlamas$.subscribe(value => (actualResult = value));
      });

      Then(() => {
        expect(actualResult).toEqual(fakeLlamas);
      });
    }); 
  });

  describe('METHOD: isListVisible', () => {
    When(() => {
      actualResult = componentUnderTest.isListVisible(fakeLlamas);
    });

    describe('GIVEN there are llamas THEN return true', () => {
      Given(() => {
        fakeLlamas = [
          {
            id: 'fake id',
            name: 'Billy',
            imageFileName: 'fakeImage.jpg'
          }
        ];
      });
      Then(() => {
        expect(actualResult).toEqual(true);
      });
    });

    describe('GIVEN there are no llamas THEN return false', () => {
      Given(() => {
        fakeLlamas = [];
      });
      Then(() => {
        expect(actualResult).toEqual(false);
      });
    });
  });

  describe('METHOD: poke', () => {
    let fakeLlama: Llama;

    Given(() => {
      fakeLlama = createDefaultFakeLlama();
    });

    When(() => {
      componentUnderTest.poke(fakeLlama);
    });

    Then(() => {
      expect(llamaStateServiceSpy.pokeLlama).toHaveBeenCalledWith(fakeLlama);
    });
  });
});

function createDefaultFakeLlama(): Llama {
  return { id: 'FAKE ID', name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' };
}
