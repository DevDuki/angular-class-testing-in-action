import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamaPageComponent } from './llama-page.component';

describe('LlamaPageComponent', () => {
  let component: LlamaPageComponent;
  let fixture: ComponentFixture<LlamaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlamaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
