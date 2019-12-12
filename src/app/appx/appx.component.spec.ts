import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppXComponent } from './appx.component';

describe('AppXComponent', () => {
  let component: AppXComponent;
  let fixture: ComponentFixture<AppXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppXComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
