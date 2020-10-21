import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPersonPage } from './detail-person.page';

describe('DetailPersonPage', () => {
  let component: DetailPersonPage;
  let fixture: ComponentFixture<DetailPersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPersonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
