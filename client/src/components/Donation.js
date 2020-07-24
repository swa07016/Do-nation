import React from 'react';
import { Progress } from 'reactstrap';

const Donation = () => {
    return(
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="single-cases mb-40">
                <div className="cases-img">
                    <img src="assets/img/gallery/case3.png" alt=""/>
                </div>
                <div className="cases-caption">
                    <h3><a href="/#">Supply Drinking Water For  The People</a></h3>
                    <div className="single-skill mb-15">
                        <div className="bar-progress">
                            
                                <div className="text-center">50%</div>
                                <Progress value={50} style={{backgroundColor : '#09CC78'}}/>
                            
                        </div>
                    </div>
                    <div className="prices d-flex justify-content-between">
                        <p>Raised:<span> $20,000</span></p>
                        <p>Goal:<span> $35,000</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Donation;