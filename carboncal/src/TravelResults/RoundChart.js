import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class RoundChart extends Component {
      
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['FN:s CO2 budget/year','This trips will exceed FN:s daily budget with:'],
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '20px',
            },
            value: {
              fontSize: '15px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 100
              }
            }
          }
        }
      },
      series: [],
     
    }
  }
  componentDidMount(){
    console.log(this.props.data)
    let rest = Math.abs(2-this.props.data);
    this.props.data > 2 ? 
    this.setState({series: [100,Math.round((rest/2)*100)]}):
    this.setState({series: [Math.round((this.props.data/2)*100)]})
  }

    
    render(){
        return(
            <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height="200"/>
        )
    }
}
export default RoundChart;