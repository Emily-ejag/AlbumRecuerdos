import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Nivel2Page } from './nivel2.page';

describe('Nivel2Page', () => {
  let component: Nivel2Page;
  let fixture: ComponentFixture<Nivel2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nivel2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Nivel2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
