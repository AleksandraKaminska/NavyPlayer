import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  widgets: []
};

const widgetReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_WIDGETS_SUCCESS:
      return Object.assign({}, state, { widgets: action.widgets });

    case types.DELETE_WIDGET_SUCCESS:

      // Use lodash to create a new widget array without the widget we want to remove
      const newWidgets = _.filter(state.widgets, widget => widget.id != action.widgetId);
      return Object.assign({}, state, { widgets: newWidgets })

  }

  return state;

}

export default widgetReducer;
