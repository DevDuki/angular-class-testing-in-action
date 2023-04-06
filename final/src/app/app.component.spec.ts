import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { LlamaStateService } from './_services/llama-state/llama-state.service';
import { Llama } from './_types/llama.type';

describe('METHOD: AppComponent', () => {
  let componentUnderTest: AppComponent;
  let llamaStateServiceSpy: Spy<LlamaStateService>;

  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        { provide: LlamaStateService, useValue: createSpyFromClass(LlamaStateService) }
      ]
    });

    componentUnderTest = TestBed.get(AppComponent);

    llamaStateServiceSpy = TestBed.inject<any>(LlamaStateService);

    actualResult = undefined;
  });

  describe('INIT', () => {
    When(() => {
      componentUnderTest.ngOnInit();
    });

    describe('EVENT: user name updated  ', () => {
      When(() => {
        componentUnderTest.userLlamaName$.subscribe(name => (actualResult = name));
      });

      describe('GIVEN null has been emitted THEN map to the name "Guest"', () => {
        Given(() => {
          llamaStateServiceSpy.getUserLlama$.and.nextOneTimeWith(null);
        });

        Then(() => {
          expect(actualResult).toEqual('Guest');
        });
      });

      describe('GIVEN llama has been emitted THEN map to the name of the llama', () => {
        Given(() => {
          const fakeLlama: Llama = {
            id: 'FAKE ID',
            name: 'FAKE NAME',
            imageFileName: 'FAKE IMAGE FILE NAME'
          };
          llamaStateServiceSpy.getUserLlama$.and.nextOneTimeWith(fakeLlama);
        });

        Then(() => {
          expect(actualResult).toEqual('FAKE NAME');
        });
      });
    });
  });
});

