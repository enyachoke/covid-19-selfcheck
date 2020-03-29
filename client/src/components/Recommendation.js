import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, CardBody, CardText, CardTitle,ListGroup,ListGroupItem } from 'reactstrap'
import { resetFormData } from '../actions/selfCheck'

import Firebase from 'firebase';
function Recommendation (props) {
  const { resetFormData, formData } = props
 // const [recommendations, setRecommendations] = React.useState(null)
  const history = useHistory()

  const possibleOutComes = {
    'outcomes': [
      {
        'label': 'veryIll',
        'value': '\n' +
          'Call the Ministry of Health emergency teams on hotlines: 0729471414/0732353535 if you have a medical emergency:\n ' +
          'Notify the operator that you have or think you might have, COVID-19. \n' +
          'If possible, put on a facemask before medical help arrives or visit the nearest health facility.',
      },
      {
        'label': 'mildIllness',
        'value': 'https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html\n',
      },
      {
        'label': 'OlderAdults',
        'value': 'https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications/older-adults.html\n',
      },
      {
        'label': 'existingMedicalCondition',
        'value': 'http://www.health.go.ke/wp-content/uploads/2020/03/COVID-19-PLHIV-Literacy-materials-23rd-March-1.pdf\n',
      },

    ],
  }


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
      if (exposed() > 0 ) {
        items.push(possibleOutComes.outcomes[1].value)
        if (formData.age >= 65) {
          items.push(possibleOutComes.outcomes[2].value)
        }
        if (selfScreeningThreshold() > 1 || dangerThreshold() > 1) {
          items =[];
          items.push(possibleOutComes.outcomes[0].value)
          history.push('/consult/'+formData.county)
        }
        if (formData.complicationRisk.preExistingConditions === "true") {
          items.push(possibleOutComes.outcomes[3].value)
        }
      } else if(selfScreeningThreshold() > 1 || dangerThreshold() > 1){
        items =[];
        items.push(possibleOutComes.outcomes[0].value)
        history.push('/consult/'+formData.county)
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

export default connect(mapStateTopProps, mapDispatchToProps)(Recommendation)