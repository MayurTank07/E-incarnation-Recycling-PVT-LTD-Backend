import nodemailer from 'nodemailer';

// Validate email configuration
const validateEmailConfig = () => {
  const missingVars = [];
  
  if (!process.env.EMAIL_USER) missingVars.push('EMAIL_USER');
  if (!process.env.EMAIL_PASSWORD) missingVars.push('EMAIL_PASSWORD');
  if (!process.env.EMAIL_FROM) missingVars.push('EMAIL_FROM');
  if (!process.env.NOTIFICATION_EMAIL) missingVars.push('NOTIFICATION_EMAIL');
  
  if (missingVars.length > 0) {
    throw new Error(`Missing email configuration: ${missingVars.join(', ')}. Please add these to your .env file.`);
  }
};

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    debug: true, // Enable debug output
    logger: true, // Log to console
  });
};

// Send contact form notification email
export const sendContactFormNotification = async (formData) => {
  try {
    console.log('📧 Starting email notification process...');
    
    // Validate configuration first
    validateEmailConfig();
    console.log('✅ Email configuration validated');
    
    const transporter = createTransporter();
    console.log(`📤 Sending email from: ${process.env.EMAIL_FROM} to: ${process.env.NOTIFICATION_EMAIL}`);

    // Determine form source for email subject
    const formSource = formData.source === 'contact_page' 
      ? 'Contact Us Page' 
      : 'Let\'s Talk Form (Footer)';

    // Email content
    const mailOptions = {
      from: `"E-Incarnation Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.NOTIFICATION_EMAIL || 'mayurtank2001@gmail.com',
      subject: `New ${formSource} Submission - ${formData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #1A0185;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 1px solid #eee;
            }
            .field-label {
              font-weight: bold;
              color: #1A0185;
              text-transform: uppercase;
              font-size: 12px;
              margin-bottom: 5px;
            }
            .field-value {
              color: #333;
              font-size: 15px;
            }
            .source-badge {
              display: inline-block;
              padding: 5px 15px;
              background-color: ${formData.source === 'contact_page' ? '#3451A3' : '#7B1FA2'};
              color: white;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              margin-top: 10px;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 2px solid #eee;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🔔 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
                You have received a new inquiry from <strong>${formData.name}</strong> through the website.
              </p>
              
              <div class="source-badge">
                ${formSource}
              </div>

              <div style="margin-top: 30px;">
                <div class="field">
                  <div class="field-label">Full Name</div>
                  <div class="field-value">${formData.name}</div>
                </div>

                ${formData.companyName ? `
                <div class="field">
                  <div class="field-label">Company Name</div>
                  <div class="field-value">${formData.companyName}</div>
                </div>
                ` : ''}

                <div class="field">
                  <div class="field-label">Email Address</div>
                  <div class="field-value">
                    <a href="mailto:${formData.email}" style="color: #1A0185; text-decoration: none;">
                      ${formData.email}
                    </a>
                  </div>
                </div>

                <div class="field">
                  <div class="field-label">Phone Number</div>
                  <div class="field-value">
                    <a href="tel:${formData.phone}" style="color: #1A0185; text-decoration: none;">
                      ${formData.phone}
                    </a>
                  </div>
                </div>

                ${formData.city || formData.state ? `
                <div class="field">
                  <div class="field-label">Location</div>
                  <div class="field-value">
                    ${[formData.city, formData.state].filter(Boolean).join(', ')}
                  </div>
                </div>
                ` : ''}

                <div class="field" style="border-bottom: none;">
                  <div class="field-label">Message</div>
                  <div class="field-value" style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
${formData.message}
                  </div>
                </div>
              </div>

              <div class="footer">
                <p style="margin: 5px 0;">This email was sent from your E-Incarnation website contact form.</p>
                <p style="margin: 5px 0;">Please respond to the customer at <strong>${formData.email}</strong></p>
                <p style="margin: 10px 0 0 0; font-size: 11px; color: #999;">
                  Submission Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text fallback
      text: `
New Contact Form Submission - ${formSource}

Name: ${formData.name}
${formData.companyName ? `Company: ${formData.companyName}\n` : ''}Email: ${formData.email}
Phone: ${formData.phone}
${formData.city || formData.state ? `Location: ${[formData.city, formData.state].filter(Boolean).join(', ')}\n` : ''}
Message:
${formData.message}

---
Submission Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
Please respond to ${formData.email}
      `.trim(),
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email notification sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Email sending failed!');
    console.error('   Error Type:', error.name);
    console.error('   Error Message:', error.message);
    console.error('   Error Code:', error.code);
    
    if (error.message.includes('Missing email configuration')) {
      console.error('\n🔧 ACTION REQUIRED: Add the following to your .env file:');
      console.error('   EMAIL_HOST=smtp.gmail.com');
      console.error('   EMAIL_PORT=587');
      console.error('   EMAIL_USER=your-gmail@gmail.com');
      console.error('   EMAIL_PASSWORD=your-app-specific-password');
      console.error('   EMAIL_FROM=your-gmail@gmail.com');
      console.error('   NOTIFICATION_EMAIL=mayurtank2001@gmail.com\n');
    }
    
    // Don't throw error - we don't want to block form submission if email fails
    return { success: false, error: error.message };
  }
};

export default {
  sendContactFormNotification,
};
