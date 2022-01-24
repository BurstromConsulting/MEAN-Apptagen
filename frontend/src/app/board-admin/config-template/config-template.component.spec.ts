import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTemplateComponent } from './config-template.component';

describe('ConfigTemplateComponent', () => {
  let component: ConfigTemplateComponent;
  let fixture: ComponentFixture<ConfigTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
