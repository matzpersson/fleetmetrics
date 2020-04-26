import React from 'react';
import AnimatedNumber from 'react-animated-number';

const GaugeNumber = (props) => {
  const {
    gauge,
    fontSize
  } = props;

  const prettyString = (n) => {
    return gauge.textValue;
  }

  
  return (
    <React.Fragment>
        <AnimatedNumber 
          component="text" 
          value={gauge.value}
          initialValue={0}
          style={{
              transition: '0.8s ease-out',
              fontSize: (fontSize ? fontSize : 48),
              color: gauge.gaugeColour,
              transitionProperty:
                  'background-color, color, opacity'
          }}
          className=""
          frameStyle={perc => (
              perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
          )}
          duration={300}
          formatValue={n => prettyString(n)}
        />

    </React.Fragment>
  )
}

export default GaugeNumber;
