import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
class RoundChart extends Component {
      
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['KG CO2/person','Over Recommended'],
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '30px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 2000
              }
            }
          }
        }
      },
      series: 
        this.props.data > 2 ? [1,Math.round((2000-((this.props.data)*1000))/100)]:
        [Math.round((2000-((this.props.data)*1000))/100)],
      
    }
  }
    render(){
        return(
            <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height="350"/>
        )
    }
}
export default RoundChart;