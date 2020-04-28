import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const ChartBar = (props) => {
  const {
    chart
  } = props;

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <React.Fragment>
       <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer>
          <BarChart
            data={chart.data}
            margin={{
              top: 20, right: 30, left: 20, bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="recorded" angle={-45} textAnchor="end" tick={{fontSize: 12}}/>
            <YAxis />
            <Tooltip />
            <Bar dataKey='data.field-0' fill={getRandomColor()} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  )
}

export default ChartBar;
