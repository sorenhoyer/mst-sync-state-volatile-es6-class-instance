import React from 'react';
import ReactDOM from 'react-dom';
import { types } from 'mobx-state-tree';
import { observable, extendObservable } from 'mobx';
import { Provider, observer, inject } from 'mobx-react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Sensor {
  constructor(maxCount){
    extendObservable(this, {
      maxCount: maxCount,
    })
  }
}

const SettingsStore = types.model({
  datapointsCount: (types.number, 20),
}).actions(self => ({
  updateDatapointsCount(n){
    self.datapointsCount = n
  }
}))

const RootStore = types.model({
  settings: types.optional(SettingsStore, {}),
})
.volatile(self => ({
  sensors: observable(new Map()),
}))
.actions(self => ({
  afterCreate(){
    self.sensors.set('sensor1', new Sensor(self.settings.datapointsCount))
    console.log(self.sensors.values())
  }
}))

const store = RootStore.create({})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
