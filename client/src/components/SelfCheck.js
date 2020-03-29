import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Form } from 'react-formio';
import { setFormData } from '../actions/selfCheck'
import data from '../data/selfcheck.json';
import Firebase from 'firebase';
function SelfCheck(props) {
    const history = useHistory();
    const { setFormData} = props;
    const handleSubmit = (form) => {
        let formId = uuidv4();
        form.data.formId=formId
        form.data.riskLevel="1"
        setFormData(form);
        Firebase.database().ref('/selfcheck/questionnaire/' + formId).set(
            form.data
        )
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
const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default connect(mapStateTopProps, mapDispatchToProps)(SelfCheck);
