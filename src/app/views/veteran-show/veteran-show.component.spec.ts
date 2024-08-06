import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeteranShowComponent } from './veteran-show.component';

describe('VeteranShowComponent', () => {
  let component: VeteranShowComponent;
  let fixture: ComponentFixture<VeteranShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeteranShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeteranShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
