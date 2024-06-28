import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryPeopleComponent } from './memory-people.component';

describe('MemoryPeopleComponent', () => {
  let component: MemoryPeopleComponent;
  let fixture: ComponentFixture<MemoryPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryPeopleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemoryPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
