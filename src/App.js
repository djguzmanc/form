import { useState } from 'react';
import './App.scss';
import Form from './components/Form/Form';
import { register } from './services/registration-service/registration-service';

function App() {
  const [responseState, setResponseState] = useState(null);

  const onFormSubmit = data => {
    setResponseState(null);
    register(data)
      .then(res => setResponseState({
        success: true,
        message: res.data.message,
      }))
      .catch(err => setResponseState({
        success: false,
        message: err.response.data.message,
      }));
  };

  return (
    <main>
      <Form
        submit={onFormSubmit}
        responseState={responseState}
        handleReset={() => setResponseState(null)} />
    </main>
  );
}

export default App;
