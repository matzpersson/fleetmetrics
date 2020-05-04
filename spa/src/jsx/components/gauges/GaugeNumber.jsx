import React from 'react';
import AnimatedNumber from 'react-animated-number';
import { HalfCircleSpinner } from 'react-epic-spinners';

const GaugeNumber = (props) => {
  const {
    gauge,
    fontSize,
    spinnerSize
  } = props;

  const prettyString = (n) => {
    return gauge.textValue;
  }

  return (
    <React.Fragment>
      { gauge.value && (
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
      )}
      { !gauge.value && (
        <div className="d-flex justify-content-center bg-warnings">
          <HalfCircleSpinner color="#4285f4" size={spinnerSize} />
        </div>

      )}
    </React.Fragment>
  )
}

export default GaugeNumber;
