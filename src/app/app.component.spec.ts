import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NameserverActions } from './+state';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const initialState = {
    nameservers: [],
    successMsg: '',
    error: ''
  };

  let component: AppComponent;
  let store: any;
  let dispatchSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    component = TestBed.createComponent(AppComponent).componentInstance;
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('onAddNameserver', () => {
    it('should dispatch add nameserver action for each valid nameserver', () => {
      const nameservers = ['ns1: 1.1.1.1', 'ns2: 2.2.2.2'];

      component.onAddNameserver(nameservers);

      expect(dispatchSpy).toHaveBeenCalledWith(
        NameserverActions.addNameserver({
          nameserver: { name: 'ns1', ipAddress: '1.1.1.1' }
        })
      );
      expect(dispatchSpy).toHaveBeenCalledWith(
        NameserverActions.addNameserver({
          nameserver: { name: 'ns2', ipAddress: '2.2.2.2' }
        })
      );
    });

    it('should dispatch failure action if more than 10 nameservers', () => {
      const manyNameservers = new Array(11).fill('');

      component.onAddNameserver(manyNameservers);

      expect(dispatchSpy).toHaveBeenCalledWith(
        NameserverActions.addNameserverFailure({
          error: 'You can only add a maximum of 10 nameservers for UK domains.'
        })
      );
    });
  });

  describe('onResetMessage', () => {
    it('should dispatch reset message action', () => {
      component.onResetMessage();

      expect(dispatchSpy).toHaveBeenCalledWith(
        NameserverActions.resetMessage()
      );
    });
  });
});
