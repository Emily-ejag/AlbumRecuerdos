import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LineaTiempoPage } from './linea-tiempo.page';

describe('LineaTiempoPage', () => {
  let component: LineaTiempoPage;
  let fixture: ComponentFixture<LineaTiempoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaTiempoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LineaTiempoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
