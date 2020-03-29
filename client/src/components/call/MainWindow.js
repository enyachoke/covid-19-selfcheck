import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useParams
} from "react-router-dom";
import Firebase from 'firebase';
import possibleOutComes from "../../constants/outcomes"
function MainWindow({ startCall, clientId }) {
  const [friendID, setFriendID] = useState(null);
  const [sessionStatus, setSessionStatus] = useState("Start Consultation with a doctor");
  let { county,formId, callId, riskLevel } = useParams();
  console.log(callId, county,riskLevel)
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  let ref = Firebase.database().ref('selfcheck/questionnaire/'+formId);
  
    React.useEffect(() => {
        const listener =ref.on('value', snapshot => {
            if(riskLevel){
              ref.update({"riskLevel":riskLevel})
            }
            let values = Object.values(snapshot.val())
            setFriendID(values)
            console.log(values)
        });
        return () => ref.off('value', listener);
    },[Firebase.database])

  const callWithVideo = (video) => {
    if(!callId){  
      const config = { audio: true, video };
      if(clientId){
        Firebase.database().ref('/callQueue/calls/'+county+clientId).set({
          county,
          clientId,
          formId,
          "date":Date.now()
        });
      }
      return () => county && startCall(true, county+"-"+clientId, config); //&& AddToQueue("Waiting for a doctor to join the call."); 
    }else{
      if(clientId){
        Firebase.database().ref('/callQueue/calls/'+county+callId).set(null);
      }
      const config = { audio: true, video };
      return () => callId && startCall(true, callId, config); //&& AddToQueue("Waiting for a doctor to join the call.");
    }
  };

  return (
    <div className="container main-window">
      <div>
        <h3>
          Hi, 
        </h3>
  <h4>{sessionStatus}</h4>
      </div>
      <div>
        {!callId ? possibleOutComes.outcomes[0].value:null}
        <div>
          <button
            type="button"
            className="btn-action fa fa-video-camera"
            onClick={callWithVideo(true)}
          />
          <button
            type="button"
            className="btn-action fa fa-phone"
            onClick={callWithVideo(false)}
          />
        </div>
      </div>
    </div>
  );
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired
};

export default MainWindow;
