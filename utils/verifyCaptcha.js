import axios from 'axios';

/**
 * Verify Google reCAPTCHA v2 token
 * @param {string} token - reCAPTCHA response token from client
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const verifyCaptcha = async (token) => {
  try {
    if (!token) {
      return { success: false, error: 'Captcha token is required' };
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('❌ RECAPTCHA_SECRET_KEY not configured in .env');
      return { success: false, error: 'Captcha verification not configured' };
    }

    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
    
    const response = await axios.post(verificationUrl, null, {
      params: {
        secret: secretKey,
        response: token,
      },
    });

    const { success, 'error-codes': errorCodes } = response.data;

    if (!success) {
      console.error('❌ Captcha verification failed:', errorCodes);
      return { 
        success: false, 
        error: 'Captcha verification failed. Please try again.' 
      };
    }

    console.log('✅ Captcha verified successfully');
    return { success: true };

  } catch (error) {
    console.error('❌ Captcha verification error:', error.message);
    return { 
      success: false, 
      error: 'Failed to verify captcha. Please try again.' 
    };
  }
};

export default verifyCaptcha;
