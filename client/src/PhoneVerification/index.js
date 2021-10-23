import React from 'react';
import axios from 'axios';

function PhoneVerification({setPage, mainPhone}) {
    const [code, setCode] = React.useState('');

    const styles = {
        headerBar: {
            height: 50,
            backgroundColor: 'red',
            display: 'flex',
        },
        heading: {
            height: 80,
            fontSize: 36,
            color: '#444',
        },
        bodyText: {
            height: 120,
        }
    }

    const handleCodeSubmit = async () => {
        console.log('Submitting', code);
        const { data: isValid } = await axios.get(`http://localhost:4001/verify/${mainPhone}?code=${code}`);
        if(isValid) {
            // Move to the next page//
            setPage(2);
            return alert('Success');
        }
        alert(`Incorrect code, please try again`);

    }

    const handleCodeInput = (e) => {
        e.preventDefault();
        setCode(e.target.value);
        // console.log('Handling Phone', phoneNumber);
    }
  
    return (
        <div>
            {/* Header Bar */}
            <div style={styles.headerBar}>
            </div>

            {/* Heading */}
            <div style={styles.heading}>
                <span>Verify your phone number</span>
            </div>

            {/* Phone Input */}
            <div>
                <span>Enter Code</span>
                <input onChange={handleCodeInput}/>
            </div>

            {/* Submit Button */}
            <div>
                <button
                    onClick={handleCodeSubmit}
                >Submit Code</button>
            </div>
        </div>
    )
}

export {
    PhoneVerification,
}