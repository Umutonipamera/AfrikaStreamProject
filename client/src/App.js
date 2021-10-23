import React from 'react';
import './App.css';
import { PhoneRegistration } from './PhoneRegistration';
import { PhoneVerification } from './PhoneVerification';
import { UploadPage } from './UploadPage';

function App() {
const [page, setPage] = React.useState(0);
const [mainPhone, setMainPhone] = React.useState('');
  return (
   <div>
     {page === 0 && <PhoneRegistration setPage={setPage} setMainPhone={setMainPhone}/>}
     {page === 1 && <PhoneVerification setPage={setPage} mainPhone={mainPhone}/>}
     {page === 2 && <UploadPage mainPhone={mainPhone} />}
   </div>
  );
}

export default App;
