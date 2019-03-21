import React, { Component } from 'react';
// Renders the choose instructions at the top of the search view
class ChooseInstructions extends Component {

    render(){
        return(
            <React.Fragment>
            <div className="container h-100" id="infoTextContainer">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-4 m-2">
                        <span><i id="infoSymbolOne" className="fas fa-check-circle m-2"></i></span>
                        <span id="infoText">Choose your ride</span>
                    </div>
                    <div className="col-sm-4 m-2">
                        <span><i id="infoSymbolTwo" className="fas fa-check-circle m-2"></i></span>
                        <span id="infoText">Choose your travel</span>
                    </div>
                    <div className="col-sm-4 m-2">
                        <span><i id="infoSymbolThree" className="fas fa-check-circle m-2"></i></span>
                        <span id="infoText">Receive your result</span>
                    </div>
                </div>
            </div>
            <div id="chooseRideContainer" className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="col-sm-12" id="chooseRideText">
                        <span><i id="infoSymbolOneBig" className="fas fa-check-circle m-2"></i></span>
                        <span id="chooseTextBig">Choose your ride</span>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )

    }

}

export default ChooseInstructions;