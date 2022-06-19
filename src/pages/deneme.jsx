import React, { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
function Deneme() {

    const onChange = (value) => {
        console.log('Captcha value:', value);
    }


    return (
        <div>
            <ReCAPTCHA
                sitekey="6LeaCH4gAAAAAGDTrEMUetcVevGempDcE0Sau-bk"
                onChange={onChange}
            />
        </div>
    )
}

export default Deneme