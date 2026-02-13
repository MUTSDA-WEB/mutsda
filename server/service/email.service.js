import nodemailer from "nodemailer";

// Configure email transporter
// You'll need to set these environment variables:
// EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD
const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST || "smtp.gmail.com",
   port: process.env.EMAIL_PORT || 587,
   secure: false, // true for 465, false for other ports
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
   },
});

// Test connection on startup
transporter.verify((error, success) => {
   if (error) {
      console.error("❌ Email service connection error:", error);
   } else {
      console.log("✅ Email service is ready:", success);
   }
});

/**
 * Send welcome email to new board member
 * @param {string} email - Recipient email
 * @param {string} name - Board member full name
 * @param {string} username - Generated username
 * @param {string} password - Generated password
 */
export async function sendWelcomeEmail(email, name, username, password) {
   const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@mutsdachurch.org",
      to: email,
      subject: "Welcome to MUTSDA Church Board - Account Credentials",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Welcome to the Church Board</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <p style="font-size: 16px; color: #333;">Dear ${name},</p>
          
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            We are delighted to welcome you as a member of the MUTSDA Church Board. 
            Your account has been created and is ready to use.
          </p>
          
          <div style="background-color: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Login Credentials</h3>
            <p style="margin: 10px 0;"><strong>Username:</strong> <code style="background: #f0f0f0; padding: 5px 10px; border-radius: 4px;">${username}</code></p>
            <p style="margin: 10px 0;"><strong>Password:</strong> <code style="background: #f0f0f0; padding: 5px 10px; border-radius: 4px;">${password}</code></p>
          </div>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>⚠️ Important:</strong> Please change your password immediately after your first login. 
              Do not share your credentials with anyone.
            </p>
          </div>
          
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            You can now access the church management portal and perform your board responsibilities.
            If you have any questions or need assistance, please contact the church administration.
          </p>
          
          <p style="font-size: 15px; color: #555;">
            Best regards,<br>
            <strong>MUTSDA Church Administration</strong>
          </p>
        </div>
        
        <div style="padding: 20px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #666;">
          <p style="margin: 5px 0;">This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    `,
   };

   try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully:", info.messageId);
      return { success: true, message: "Welcome email sent successfully" };
   } catch (error) {
      console.error("❌ Error sending email:", {
         message: error.message,
         code: error.code,
         response: error.response,
      });
      return { success: false, error: error.message };
   }
}

/**
 * Send password change confirmation email
 * @param {string} email - Recipient email
 * @param {string} name - User's name
 */
export async function sendPasswordChangeEmail(email, name) {
   const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@mutsdachurch.org",
      to: email,
      subject: "Password Changed - MUTSDA Church Account Security",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">🔒 Password Changed</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <p style="font-size: 16px; color: #333;">Dear ${name},</p>
          
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            This email confirms that your password for your MUTSDA Church Board account has been successfully changed.
          </p>
          
          <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #155724; font-size: 14px;">
              <strong>✓ Success:</strong> Your password was changed on ${new Date().toLocaleString()}
            </p>
          </div>
          
          <h3 style="color: #333; margin-top: 20px;">Did you make this change?</h3>
          <p style="font-size: 15px; color: #555; line-height: 1.6;">
            If you did not make this change or if you believe your account has been compromised, 
            please contact the church administration immediately at <strong>katutheman@gmail.com</strong>.
          </p>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>🔐 Security Tips:</strong>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Never share your password with anyone</li>
                <li>Use a strong, unique password</li>
                <li>Log out from all devices if you suspect unauthorized access</li>
              </ul>
            </p>
          </div>
          
          <p style="font-size: 15px; color: #555;">
            Best regards,<br>
            <strong>MUTSDA Church Administration</strong>
          </p>
        </div>
        
        <div style="padding: 20px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #666;">
          <p style="margin: 5px 0;">This is an automated security notification. Please do not reply to this email.</p>
        </div>
      </div>
    `,
   };

   try {
      const info = await transporter.sendMail(mailOptions);
      console.log(
         "✅ Password change email sent successfully:",
         info.messageId,
      );
      return {
         success: true,
         message: "Password change email sent successfully",
      };
   } catch (error) {
      console.error("❌ Error sending password change email:", {
         message: error.message,
         code: error.code,
         response: error.response,
      });
      return { success: false, error: error.message };
   }
}

/**
 * Verify transporter connection (useful for testing)
 */
export async function verifyEmailService() {
   try {
      await transporter.verify();
      return {
         success: true,
         message: "Email service is configured correctly",
      };
   } catch (error) {
      console.error("Email service verification failed:", error);
      return { success: false, error: error.message };
   }
}
