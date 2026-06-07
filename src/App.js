import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import './App.css';

const API_URL = 'YOUR_API_GATEWAY_URL';

function App() {
  const webcamRef = useRef(null);
  const [uploadResultMessage, setUploadResultMessage] = useState('Please capture your face to authenticate.');
  const [isAuth, setIsAuth] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsCaptured(true);
  }, [webcamRef]);

  async function sendImage() {
    if (!capturedImage) return;
    setUploadResultMessage('Authenticating...');

    const base64Data = capturedImage.split(',')[1];

    try {
      const response = await fetch(`${API_URL}/attendance`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data })
      });

      const data = await response.json();

      if (data.Message === 'Success') {
        setIsAuth(true);
        setUploadResultMessage(`Hi ${data.firstName} ${data.lastName}, welcome ! ✅`);
      } else {
        setIsAuth(false);
        setUploadResultMessage('Authentication Failed: Person not recognised ❌');
      }
    } catch (error) {
      setIsAuth(false);
      setUploadResultMessage('Error during authentication. Please try again.');
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h2>Smart Attendance System</h2>

      {!isCaptured ? (
        <div>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            height={250}
          />
          <br />
          <button onClick={capturePhoto}>Capture Photo</button>
        </div>
      ) : (
        <div>
          <img src={capturedImage} alt="Captured" width={300} height={250} />
          <br />
          <button onClick={() => { setIsCaptured(false); setCapturedImage(null); }}>
            Retake
          </button>
          <button onClick={sendImage}>Authenticate</button>
        </div>
      )}

      <div className={isAuth ? 'success' : 'failure'}>
        {uploadResultMessage}
      </div>
    </div>
  );
}

export default App;