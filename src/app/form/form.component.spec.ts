import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial name should be empty', () => {

    expect(component.form.get('name').value).toEqual('');
  });

  describe('when Administrator is checked', () => {

    beforeEach(() => {
      component.form
      .get('roles')
      .get('admin')
      .setValue(true);
    });

    it('ExecutionManager is checked too', () => {
      // Assert
      expect(component.form.get('roles').get('executionmanager').value).toBeTruthy();
    });

    it('ManagementStudio is checked too', () => {
      // Assert
      expect(component.form.get('roles').get('managementstudio').value).toBeTruthy();
    });

  });

  describe('when Analyze is checked', () => {

    beforeEach(() => {
      // Admin, EM and MS are selected
      component.form
      .get('roles')
      .patchValue({
        'admin': true
      });

      // When I click Analyze it should clear the others.
      component.form
      .get('roles')
      .get('analyze')
      .setValue(true);
    });

    it('Administrator is unchecked', () => {
      // Assert
      expect(component.form.get('roles').get('admin').value).toBeFalsy();
    });
  });

  describe('when ExecutionManager is unchecked', () => {

        beforeEach(() => {
          // Admin, EM and MS are selected
          component.form
          .get('roles')
          .patchValue({
            'admin': true
          });

          // When I click Analyze it should clear the others.
          component.form
          .get('roles')
          .get('executionmanager')
          .setValue(false);
        });

        it('Administrator is unchecked too', () => {
          // Assert
          expect(component.form.get('roles').get('admin').value).toBeFalsy();
        });
      });

      describe('when ManagementStudio is unchecked', () => {

            beforeEach(() => {
              // Admin, EM and MS are selected
              component.form
              .get('roles')
              .patchValue({
                'admin': true
              });

              // When I click Analyze it should clear the others.
              component.form
              .get('roles')
              .get('managementstudio')
              .setValue(false);
            });

            it('Administrator is unchecked too', () => {
              // Assert
              expect(component.form.get('roles').get('admin').value).toBeFalsy();
            });
          });
});
