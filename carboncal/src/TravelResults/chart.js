
import React, { Component } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

/*
export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/3Leoa7f4/';

*/
class Chart extends Component {
    constructor(props) {
        super(props);
        
    }

  render() {
    return (
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={[{ name: 'Group A', value: this.props.data},
        {name: 'rest', value: (2-this.props.data)}]}
        
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
           [{ name: 'Group A', value: this.props.data},
           {name: 'rest', value: (2-this.props.data)}].map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>


      </PieChart>
    );
  }
}
export default Chart;




