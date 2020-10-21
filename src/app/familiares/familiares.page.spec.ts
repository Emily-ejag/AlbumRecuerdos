import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FamiliaresPage } from './familiares.page';

describe('FamiliaresPage', () => {
  let component: FamiliaresPage;
  let fixture: ComponentFixture<FamiliaresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliaresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FamiliaresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
