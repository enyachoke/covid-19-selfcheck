import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { resetFormData } from '../actions/selfCheck'
function Recommendation(props) {
    const { resetFormData, formData } = props;
    const getPerc = (obj1, obj2) => {
        var count = [0, 0];
        for (var key in obj1) {
            count[1]++; // total count
            console.log('first', obj1[key], key);
            console.log('second', obj2[key], key);
            if (obj2.hasOwnProperty(key) && obj2[key] === obj1[key]) {
                count[0]++; // match count
            }
        }
        var percentage = count[0] / count[1] * 100 + "%";
        console.log(percentage);
    }
    const selfScreening = {
        cough: 'yes',
        fever: 'yes',
        difficultyBreathing: 'yes',
        traveledOutside: 'yes',
        contactWithcase: 'yes',
        beenInAffectedFacility: 'yes'
    }
    //getPerc(form.data.selfScreening, selfScreening);
    //getPerc(form.data.dangerSigns, dangerSigns)
    const dangerSigns = {
        difficultyBreathing: 'yes',
        chestPains: 'yes',
        confusion: 'yes'
    }
    const prettyFormData = JSON.stringify(formData, null, 2);
    if (!formData?.selfScreening && !formData?.dangerSigns) {
        return <Redirect to='/' />
    }
    return (

        <>
            <Card>
                <CardBody>
                    <CardTitle>Recommendations</CardTitle>
                    <CardText>{prettyFormData}</CardText>
                </CardBody>
            </Card>


        </>
    )
}
const mapStateTopProps = (state) => {
    return {
        formData: state.selfCheck.formData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetFormData: () => {
            dispatch(resetFormData());
        },
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Recommendation);