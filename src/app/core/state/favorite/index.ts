import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector
  } from '@ngrx/store';
  import * as fromFavorite from '@core/state/favorite/favorite.reducer';
  
  export interface State {
    todo: fromFavorite.State;
  }
  
  export const reducers: ActionReducerMap<State> = {
    todo: fromFavorite.reducer,
  };
  

  
  // console.log all actions
  export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
 
      return reducer(state, action);
    };
  }
  
  

  
  // Todo reducers Begin
  
  export const getFavoriteState = createFeatureSelector<fromFavorite.State>('favorite');
  
  export const getTasks = createSelector(
    getFavoriteState,
    fromFavorite.getTasks
  );