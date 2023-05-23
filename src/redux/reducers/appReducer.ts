import initialState from './initialState';

export default function appReducer (currentState: object, action: { type: string }): any {
  const state = currentState || initialState.app;
  switch (action.type) {
    default:
      return state;
  }
}
