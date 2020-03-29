import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, CardBody, CardText, CardTitle,ListGroup,ListGroupItem } from 'reactstrap'
import { resetFormData } from '../actions/selfCheck'

import Firebase from 'firebase';
import possibleOutComes from "../constants/outcomes"
function Recommendation (props) {
  const { resetFormData, formData } = props
 // const [recommendations, setRecommendations] = React.useState(null)
  const history = useHistory()
  let items = []
    if (!formData?.selfScreening && !formData?.dangerSigns) {
      history.push('/')
    } else {
      const exposed = (() => {
        let exposurethreshold = 0
        let exposure = Object.values(formData.exposure)
        exposure.forEach((element) => {
          if (element === 'true') {
            exposurethreshold += 1
          }
        })
        return exposurethreshold

      })

      const selfScreeningThreshold = (() => {
        let screenOutcomeThreshold = 0
        let selfScreening = Object.values(formData.selfScreening)
        selfScreening.forEach((element) => {
          if (element === 'true') {
            screenOutcomeThreshold += 1
          }
        })
        return screenOutcomeThreshold
      })
      const dangerThreshold = (() => {
        let danger = 0
        let dangerSigns = Object.values(formData.dangerSigns)
        dangerSigns.forEach((element) => {
          if (element === 'true') {
            danger += 1
          }
        })
        return danger
      })
      let riskLevel=1;
      if (exposed() > 0 ) {
        items.push(possibleOutComes.outcomes[1].value)
        if (formData.age >= 65) {
          //exposure
          //Add details of risk levels
          riskLevel+=1;
          items.push(possibleOutComes.outcomes[2].value)
        }
        if (selfScreeningThreshold() > 1 || dangerThreshold() > 1) {
          riskLevel+=2;
          items =[];
          items.push(possibleOutComes.outcomes[0].value)
          history.push('/consult/'+formData.selectCounty+"/"+formData.formId+"/"+riskLevel)
        }
        if (formData.complicationRisk.preExistingConditions === "true") {
          riskLevel+=1;
          items.push(possibleOutComes.outcomes[3].value)
        }
      } else if(selfScreeningThreshold() > 1 || dangerThreshold() > 1){
        riskLevel+=2;
        items =[];
        items.push(possibleOutComes.outcomes[0].value)
        history.push('/consult/'+formData.selectCounty+"/"+formData.formId+"/"+riskLevel)
      }else  {
        items.push(
          'You are healthy. This application is only for those feeling ill')
      }
    }


  return (

    <>
      <Card>
        <CardBody>
          <CardTitle>Recommendations</CardTitle>
          <ListGroup>
            { items.map(item =><ListGroupItem tag="a" key={item} href={item}>{item}</ListGroupItem> )}
          </ListGroup>
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
      dispatch(resetFormData())
    },
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Recommendation)