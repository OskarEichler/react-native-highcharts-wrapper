import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

import styles from './styles';
import { getInit, getEnd, flattenObject } from './helpers';

class Chart extends Component {

  shouldComponentUpdate(nextProps) {
    return (this.props.nameForReload !== nextProps.nameForReload); //Using this prop to tell when to re-render
  }

  render() {
    let config = JSON.stringify(this.props.config, (_, value) => {
      //create string of json but if it detects function it uses toString()
      return typeof value === 'function' ? value.toString() : value;
    });

    config = JSON.parse(config);
    const concatHTML = `${getInit(this.props)}${flattenObject(config)}${getEnd()}`;

    return (
      <View style={this.props.style}>
        <WebView
          style={styles.full}
          source={{ html: concatHTML, baseUrl: 'web/' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          {...this.props}
        />
      </View>
    );
  }
}

export default function ChartContainer(props) {
  return <Chart {...props} />
}
