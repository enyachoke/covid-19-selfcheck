import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useParams
} from "react-router-dom";
import Firebase from 'firebase';
function MainWindow({ startCall, clientId }) {
  const [friendID, setFriendID] = useState(null);
  const [sessionStatus, setSessionStatus] = useState("Start Consultation with a doctor");
  let { county, callId } = useParams();
  console.log(callId, county)
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  
  const callWithVideo = (video) => {
    if(!callId){  
      const config = { audio: true, video };
      Firebase.database().ref('/'+county+clientId).set({
        clientId
      });
      return () => county && startCall(true, county+"-"+clientId, config); //&& AddToQueue("Waiting for a doctor to join the call."); 
    }else{
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
        {/* <input
          type="text"
          className="txt-clientId"
          spellCheck={false}
          placeholder="Your friend ID"
          onChange={(event) => setFriendID(event.target.value)}
        /> */}
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
