import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getMissions, joinMission, leaveMission } from '../redux/missions/missionsSlice';

const mockStore = configureMockStore([thunk]);

describe('testing missionsSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      missions: {
        missions: [],
        isLoading: false,
        error: '',
      },
    });
  });

  it('should get missions from API', async () => {
    const expectedActions = [
      getMissions.pending.type,
      getMissions.fulfilled.type,
    ];

    await store.dispatch(getMissions());
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });

  it('should join a mission', () => {
    const id = 763;
    const expectedAction = {
      type: joinMission.type,
      payload: id,
    };
    expect(joinMission(id)).toEqual(expectedAction);
  });

  it('should leave a mission', () => {
    const id = 763;
    const expectedAction = {
      type: leaveMission.type,
      payload: id,
    };
    expect(leaveMission(id)).toEqual(expectedAction);
  });
});
