import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Rockets from '../components/Rockets';
import { addReservation, deleteReservation } from '../redux/rockets/rocketsSlice';

const mockStore = configureStore([]);

describe('Rockets component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      rockets: {
        rockets: [
          {
            rocket_id: 'falcon1',
            rocket_name: 'Falcon 1',
            description: 'The Falcon 1 description.',
            flickr_images: [],
            reserved: false,
          },
          {
            rocket_id: 'falcon9',
            rocket_name: 'Falcon 9',
            description: 'Falcon 9 description.',
            flickr_images: [],
            reserved: true,
          },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  test('should render the page elements', () => {
    render(<Provider store={store}><Rockets /></Provider>);

    expect(screen.getByRole('heading', { name: 'Falcon 1' })).toBeInTheDocument();
    expect(screen.getByText('The Falcon 1 description.')).toBeInTheDocument();
    expect(screen.getByText('Reserve Rocket')).toBeInTheDocument();
    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    expect(screen.getByText('Falcon 9 description.')).toBeInTheDocument();
    expect(screen.getByText('Reserved')).toBeInTheDocument();
    expect(screen.getByText('Cancel Reservation')).toBeInTheDocument();
  });

  test('should dispatch addReservation action', () => {
    render(<Provider store={store}><Rockets /></Provider>);

    fireEvent.click(screen.getByText('Reserve Rocket'));

    expect(store.dispatch).toHaveBeenCalledWith(addReservation('falcon1'));
  });

  test('should dispatch deleteReservation action', () => {
    render(<Provider store={store}><Rockets /></Provider>);

    fireEvent.click(screen.getByText('Cancel Reservation'));

    expect(store.dispatch).toHaveBeenCalledWith(deleteReservation('falcon9'));
  });
});
