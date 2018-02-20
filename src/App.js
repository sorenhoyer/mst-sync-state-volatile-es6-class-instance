import React from 'react';
import { observer, inject } from 'mobx-react';

class App extends React.Component {
  componentDidMount(){
    let settingsStore = this.props.store.settings;
    setTimeout(() => {
      settingsStore.updateDatapointsCount(50)
    }, 5000);
  }

  render(){
    const { store } = this.props;

    return (
      <div>
        <p>store.settings.datapointsCount: {store.settings.datapointsCount}</p>
        <p>store.sensors.get('sensor1').maxCount: {store.sensors.get('sensor1').maxCount}</p>
      </div>
    )
  }
  
}

export default App = inject('store')(observer(App))