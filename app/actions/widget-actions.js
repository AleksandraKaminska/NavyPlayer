import * as types from '../actions/action-types';

export function getWidgetsSuccess(widgets) {
  return {
    type: types.GET_WIDGETS_SUCCESS,
    widgets
  };
}

export function deleteWidgetSuccess(widgetId) {
  return {
    type: types.DELETE_WIDGET_SUCCESS,
    widgetId
  };
}
