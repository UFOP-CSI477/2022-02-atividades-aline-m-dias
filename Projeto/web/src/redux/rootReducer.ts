import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import classReducer from './slices/class';
import deliveriesReducer from './slices/deliveries';
import disciplineReducer from './slices/discipline';
import studentReducer from './slices/student';
import taskReducer from './slices/task';
import teacherReducer from './slices/teacher';


const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  student: studentReducer,
  class: classReducer,
  deliveries: deliveriesReducer,
  discipline: disciplineReducer,
  task: taskReducer,
  teacher: teacherReducer
});

export { rootPersistConfig, rootReducer };

