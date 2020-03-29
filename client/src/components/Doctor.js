import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap'
import { resetFormData } from '../actions/selfCheck'

import Firebase from 'firebase';

function Doctor() {
    const [a, setA] = React.useState([])
    const possibleOutComes = {
        'outcomes': ["a", "b"
        ],
    }
    let ref = Firebase.database().ref('/callQueue/calls/');

    React.useEffect(() => {
        const listener =ref.on('value', snapshot => {
            let values = Object.values(snapshot.val())
            setA(values)
        });
        return () => ref.off('value', listener);
    },[Firebase.database])
    
    {console.log(a)}
    return (

        <>
            <Card>
                <CardBody>
                    <CardTitle>Client's Queue</CardTitle>
                    <ListGroup>
                        {Object.keys(a).map((key,value) => 
                        <ListGroupItem tag="a" key={key} href={"/#/doctor/" + a[value].clientId+"/"+a[value].county}>
                            Client No.{a[value].clientId}
                        </ListGroupItem>)}
                    </ListGroup>
                </CardBody>
            </Card>


        </>
    )
}
const mapStateTopProps = (state) => {
    return {
        formData: state.selfCheck.formData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetFormData: () => {
            dispatch(resetFormData())
        },
    }


}
export default connect(mapStateTopProps, mapDispatchToProps)(Doctor)