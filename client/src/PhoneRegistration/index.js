import React from 'react';
import axios from 'axios';

function PhoneRegistration({setPage, setMainPhone}) {
    const [phoneNumber, setPhoneNumber] = React.useState('');

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

    const isPhoneValid = (phoneNumber = '') => {
        if (phoneNumber.length === 0) {
            // The phone is empty
            return false;
        } else if (phoneNumber.length < 12) {
            // The phone is too short
            return false;
        } else if (phoneNumber.length >12) {
            // The phone is too long
            return false;
        }
        return true;
    }

    const handlePhoneSubmit = async () => {
        console.log('Submitting', phoneNumber);
        const validPhone = isPhoneValid(phoneNumber);
        console.log('Is Valid', validPhone )
        if(!validPhone) {
            alert('Invalid Phone number');
            return null;
        }
        const { data: code } = await axios.get(`http://localhost:4001/phone/${phoneNumber}`);
        alert(`Here is your code for ${phoneNumber} : ${code}`);
        setPage(1);
        setMainPhone(phoneNumber);

    }

    const handlePhoneInput = (e) => {
        e.preventDefault();
        setPhoneNumber(e.target.value);
        // console.log('Handling Phone', phoneNumber);
    }
  
    return (
        <div>
            {/* Header Bar */}
            <div style={styles.headerBar}>
            </div>

            {/* Heading */}
            <div style={styles.heading}>
                <span>Register your phone number</span>
            </div>

            {/* Body Text */}
            <div style={styles.bodyText}>
                <span>Please enter a valid phone number below to generate a random login code.</span>
            </div>

            {/* Phone Input */}
            <div>
                <span>Enter Phone number</span>
                <input onChange={handlePhoneInput}/>
            </div>

            {/* Submit Button */}
            <div>
                <button
                    onClick={handlePhoneSubmit}
                >Submit Phone Number</button>
            </div>
        </div>
    )
}

export {
    PhoneRegistration,
}