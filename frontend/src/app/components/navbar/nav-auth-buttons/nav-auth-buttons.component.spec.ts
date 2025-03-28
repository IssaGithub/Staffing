import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavAuthButtonsComponent } from './nav-auth-buttons.component';

describe('NavAuthButtonsComponent', () => {
  let component: NavAuthButtonsComponent;
  let fixture: ComponentFixture<NavAuthButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavAuthButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavAuthButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
