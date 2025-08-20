const nodemailer = require('nodemailer');
require('dotenv').config();

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};

const sendSignupNotification = async (signupData) => {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333; text-align: center; background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
          🚨 New Website Signup Alert
        </h2>
        
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #856404; margin: 0;">New Construction Project Inquiry</h3>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${signupData.firstName} ${signupData.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;"><a href="mailto:${signupData.email}">${signupData.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;"><a href="tel:${signupData.phone}">${signupData.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Company:</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${signupData.company || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Project Type:</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">
              <span style="background-color: #007bff; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                ${signupData.projectType.toUpperCase()}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Message:</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${signupData.message || 'No additional message'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Signup Time:</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
        
        <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h4 style="color: #155724; margin: 0 0 10px 0;">Next Steps:</h4>
          <ul style="color: #155724; margin: 0; padding-left: 20px;">
            <li>Contact the client within 24 hours</li>
            <li>Schedule initial consultation if needed</li>
            <li>Update status in admin dashboard</li>
            <li>Send welcome/confirmation email to client</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 12px;">
            This email was automatically generated from your construction website signup form.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🚨 New Signup: ${signupData.firstName} ${signupData.lastName} - ${signupData.projectType}`,
      html: htmlContent,
      text: `
        NEW WEBSITE SIGNUP ALERT
        
        Name: ${signupData.firstName} ${signupData.lastName}
        Email: ${signupData.email}
        Phone: ${signupData.phone}
        Company: ${signupData.company || 'Not provided'}
        Project Type: ${signupData.projectType}
        Message: ${signupData.message || 'No additional message'}
        Signup Time: ${new Date().toLocaleString()}
        
        Please contact this potential client as soon as possible.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Signup notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

const sendUserConfirmation = async (signupData) => {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center;">Welcome to Our Construction Services!</h2>
        
        <p>Dear ${signupData.firstName},</p>
        
        <p>Thank you for your interest in our construction services. We have received your inquiry and our team will contact you within 24 hours.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h4>Your Submitted Information:</h4>
          <p><strong>Project Type:</strong> ${signupData.projectType}</p>
          <p><strong>Company:</strong> ${signupData.company || 'Not provided'}</p>
          ${signupData.message ? `<p><strong>Message:</strong> ${signupData.message}</p>` : ''}
        </div>
        
        <p>In the meantime, feel free to explore our portfolio and learn more about our services on our website.</p>
        
        <p>Best regards,<br>The Construction Team</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: signupData.email,
      subject: 'Thank you for your construction inquiry',
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ User confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ User confirmation email failed:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendSignupNotification,
  sendUserConfirmation
};

