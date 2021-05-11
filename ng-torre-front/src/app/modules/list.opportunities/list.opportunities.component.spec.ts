import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOpportunities } from './list.opportunities.component';

describe('LoginComponent', () => {
  let component: ListOpportunities;
  let fixture: ComponentFixture<ListOpportunities>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOpportunities ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOpportunities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
