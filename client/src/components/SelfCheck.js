import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Form } from 'react-formio';
import { setFormData } from '../actions/selfCheck'
import data from '../data/selfcheck.json';
function SelfCheck(props) {
    const history = useHistory();
    const { setFormData} = props;
    const handleSubmit = (form) => {
        setFormData(form);
        console.log('Redirect');
        history.push('/recommendations')
    };


    return (
        <div>
            <Form form={data} onSubmit={handleSubmit} />
        </div>
    );
}
const mapStateTopProps = (state) => {
    console.log(state)
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFormData: (payload) => {
            dispatch(setFormData(payload));
        },
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(SelfCheck);
