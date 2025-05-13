import EmailManagement from "../data/models/email_management.js";

const data = [
	{
		id: 1,
		name: "contactAdmin",
		htmlContent: `<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F4F4F4; color: #484848;">
        <div style="background-color: #F4F4F4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fefefe; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
                <p>Hi Admin,</p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                        <tr>
                            <td style="padding: 16px;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="left">
                                                <table role="presentation" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse: collapse; border: 1px solid #d2d2d2;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding: 20px; border-bottom: 1px solid #d2d2d2;">
                                                                <h1 style="margin: 0; font-size: 22px;">{{subject}}</h1>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 20px; border-bottom: 1px solid #d2d2d2;">
                                                                <p><strong>Name:</strong> {{name}}</p>
                                                                <p><strong>Email:</strong> {{email}}</p>
                                                                <p><strong>Feedback:</strong> {{feedback}}</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr style="max-width:580px; border: none; background-color: #dbdbdb; height: 2px; width: 100%; margin: auto;">
                <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
            </div>
        </div>
    </body>
</html>`,
		status: true,
	},
	{
		id: 2,
		name: "confirmUserEmail",
		htmlContent: `<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F4F4F4; color: #484848;">
        <div style="background-color: #F4F4F4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fefefe; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
                <p>Hi {{name}},</p>
                {{#if status}}

                <p>Welcome to Hyra Space!.</p>                
                <p>Hyra Space is a global platform where you can find awesome places to stay.</p>                

                {{else}}

                <p>Welcome to Hyra Space! In order to get started, you need to confirm your email address.</p>
                <h4>Confirm email OTP : {{otp}}</h4> 

                {{/if}}
                <p style="margin-bottom: 5px;">Thanks,</p>
                <p style="margin-top: 5px;">Hyra Space Team</p>
                <hr style="max-width:580px; border: none; background-color: #dbdbdb; height: 2px; width: 100%; margin: auto;">
                 <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
            </div>
        </div>
    </body>
</html>`,
	},
	{
		id: 3,
		name: "userActivity",
		htmlContent: `<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F4F4F4; color: #484848;">
        <div style="background-color: #F4F4F4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fefefe; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
                <h1 style="font-size: 32px; line-height: 36px;">Did you change your password?</h1>
                <p style="line-height: 25px;">We noticed the password for your Hyra Space account was recently changed. If this was you, you can safely disregard this email.</p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                        <tr>
                            <td style="padding: 16px;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; border: 1px solid #d2d2d2;">
                                    <tbody>
                                        <tr>
                                            <td style="padding: 20px; border-bottom: 1px solid #d2d2d2;">
                                                <h1 style="margin: 0; font-size: 22px;">Password Changed</h1>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 20px; border-bottom: 1px solid #d2d2d2;">
                                                <p><strong>When:</strong> {{when}}</p>                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 20px; text-align: center;" class="btn">
                                                <a href="{{account_review_link}}" style="background-color: #e57c39; color: #FFFFFF; width: 100%; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">Review My Account</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr style="max-width:580px; border: none; background-color: #dbdbdb; height: 2px; width: 100%; margin: auto;">
                 <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
            </div>
        </div>
    </body>
</html>`,
		status: true,
	},
	{
		id: 4,
		name: "resetUserPassword",
		htmlContent: `<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F4F4F4; color: #484848;">
        <div style="background-color: #F4F4F4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fefefe; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
                <p>Hi {{name}},</p>
                <p>We've received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using this otp:</p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" width="100%">
                    <tbody>
                        <tr>
                            <td align="center">
                                <h4>Password Reset OTP: {{otp}}</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p style="margin-bottom: 5px;">Thanks,</p>
                <p style="margin-top: 5px;">Hyra Space Team</p>
                <hr style="max-width:580px; border: none; background-color: #dbdbdb; height: 2px; width: 100%; margin: auto;">
                 <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
            </div>
        </div>
    </body>
</html>`,
		status: true,
	},
	{
		id: 5,
		name: "paymentMethodNotification",
		htmlContent: `<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F4F4F4; color: #484848;">
        <div style="background-color: #F4F4F4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fefefe; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
                <h1 style="font-size: 32px; line-height: 36px;">A payment method was added to your account</h1>
                <p style="line-height: 25px;">The payment method below was added to your account on {{date}}.</p>
                <table role="presentation" border="0" cellpadding="16" cellspacing="0" width="100%">
                    <tbody>
                        <tr>
                            <td align="left" width="50%">
                                <p style="line-height: 25px; margin: 0;">Payment Method</p>
                            </td>
                            <td align="right" width="50%">
                                <p style="line-height: 25px; margin: 0;">{{brand}} xxxxxxxxxxxx{{last4}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <h1 style="font-size: 21px; line-height: 36px; color: #545454;">Updated by {{user}}</h1>
                                <p style="margin-top: 8px; margin-bottom: 8px;">{{location}}</p>
                                <p style="margin-top: 8px; margin-bottom: 8px;">{{device}}</p>
                                <h1 style="font-size: 21px; line-height: 36px; color: #545454;">Don't recognize this?</h1>
                                <p style="line-height: 26px;"><span><a href="{{report_link}}" style="text-decoration: none; color: #e57c39;">Let us know</a></span> — we'll help secure and review your account. Otherwise, no action is required.</p>
                                <h1 style="font-size: 21px; line-height: 36px; color: #545454;">Why we send you these emails</h1>
                                <p style="margin-top: 8px; margin-bottom: 8px; line-height: 26px;">Staying informed about changes to your account is one of the best ways to keep it secure. You might see this email again when you update your info, sign in for the first time on a new computer, phone, or browser, or clear your cookies.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr style="max-width:580px; border: none; background-color: #dbdbdb; height: 2px; width: 100%; margin: auto;">
                 <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
            </div>
        </div>
    </body>
</html>`,
		status: true,
	},
	{
		id: 6,
		name: "listingDetailUpdated",
		htmlContent: `<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F4F4F4; color: #484848;">
        <div style="background-color: #F4F4F4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fefefe; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
                <p>Hi {{name}},</p>
                <p>Information updated on <a class="link" href="{{room_link}}">{{room_name}}</a> at {{date}}.</p>
                <p style="margin-bottom: 5px;">Thanks,</p>
                <p style="margin-top: 5px;">Hyra Space Team</p>
                <hr style="max-width:580px; border: none; background-color: #dbdbdb; height: 2px; width: 100%; margin: auto;">
                 <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
            </div>
        </div>
    </body>
</html>`,
		status: true,
	},
	{
		id: 7,
		name: "listingStatusUpdated",
		htmlContent: `<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F4F4F4; color: #484848;">
        <div style="background-color: #F4F4F4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fefefe; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
                <p>Hi {{name}},</p>
                {{{content}}}
                <p style="margin-bottom: 5px;">Thanks,</p>
                <p style="margin-top: 5px;">Hyra Space Team</p>
                <hr style="max-width:580px; border: none; background-color: #dbdbdb; height: 2px; width: 100%; margin: auto;">
                 <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
            </div>
        </div>
    </body>
</html>`,
		status: true,
	},
	{
		id: 8,
		name: "awaitingForApproval",
		htmlContent: `<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F4F4F4; color: #484848;">
        <div style="background-color: #F4F4F4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fefefe; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
                <p>Hi {{name}},</p>
                {{#if type}}
                <p>Thanks for listing in Hyra Space! Your space <a class="link" href="{{room_link}}">{{room_name}}</a> will be valued and approved by the Admin soon.</p>
                {{else}}
                <p>You got New listing named as {{room_name}} Waiting for your approval to get listed.</p>
            {{/if}}
                <p style="margin-bottom: 5px;">Thanks,</p>
                <p style="margin-top: 5px;">Hyra Space Team</p>
                <hr style="max-width:580px; border: none; background-color: #dbdbdb; height: 2px; width: 100%; margin: auto;">
                <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
            </div>
        </div>
    </body>
</html>`,
		status: true,
	},
	{
		id: 9,
		name: "listingApproved",
		htmlContent: `<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F4F4F4; color: #484848;">
        <div style="background-color: #F4F4F4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fefefe; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
                <p>Hi {{name}},</p>
                <p>Congratulations! Your room <a class="link" href="{{room_link}}">{{room_name}}</a> was approved by Hyra Space Admin and will start appearing in search results shortly.</p>
                <p>If your listing is not ready for hosting, go to <a class="link" href="{{manage_listing_link}}">Manage Listing</a> to unlist it.</p>
                <p style="margin-bottom: 5px;">Thanks,</p>
                <p style="margin-top: 5px;">Hyra Space Team</p>
                <hr style="max-width:580px; border: none; background-color: #dbdbdb; height: 2px; width: 100%; margin: auto;">
                 <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
            </div>
        </div>
    </body>
</html>`,
		status: true,
	},
	{
		id: 10,
		name: "bookingConfirmed",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

        <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>

        <!-- Address Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">Address</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{address}}</p>
            <a href="{{directions_url}}" class="link">Get directions</a>
        </div>

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Confirmation Code</p>
                    <p style="margin-bottom: 0;">{{confirmation_code}}</p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="section" style="display: flex; justify-content: space-between; gap:10px">
            <a href="{{view_receipt_url}}" class="btn btn-primary">View Receipt</a>
            <a href="{{download_receipt_url}}" class="btn btn-primary">Download Receipt</a>
        </div>

        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        <div style="text-align: left; padding: 16px;">
            <h3>Price Details</h3>
            {{{price_details}}}
        </div>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 11,
		name: "itineraryShared",
		htmlContent: `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{subject}}</title>
        <style>
            body {
                background-color: #F4F4F4;
                margin: 0;
                padding: 0;
                color: #484848;
                font-family: 'Arial', sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #fefefe;
            }
            .btn {
                width: 100%;
                box-sizing: border-box;
                padding: 12px 25px;
                display: inline-block;
                border-radius: 5px;
                text-align: center;
                text-decoration: none;
            }
            .btn-primary {
                background-color: #e57c39;
                color: #ffffff;
                border: 1px solid #e57c39;
            }
            .btn-secondary {
                background-color: #ffffff;
                color: #e57c39;
                border: 1px solid #e57c39;
            }
            .link {
                color: #e57c39;
                text-decoration: none;
            }
            .h1 {
                font-size: 32px;
                line-height: 36px;
            }
            hr {
                border: 0;
                height: 2px;
                background-color: #cacaca;
                margin: 20px 0;
            }
            .section {
                padding: 16px;
                border-bottom: 1px solid #d2d2d2;
            }
            .image {
                width: 100%;
                height: 400px;
                object-fit: cover;
            }
            .avatar {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div style="text-align: center; padding: 25px 0;">
                <a href="{{website_url}}">
                    <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
                </a>
            </div>
        
                    <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


            <!-- Main Image -->
            <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">
    
            <!-- Content Section -->
            <div class="section">
                <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
                <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
            </div>
    
            <!-- Address Section -->
            <div class="section">
                <p style="font-weight: 600; margin-bottom: 0;">Address</p>
                <p style="color: #7c7c7c; margin-bottom: 0;">{{address}}</p>
                <a href="{{directions_url}}" class="link">Get directions</a>
            </div>
    
            <!-- Checkin/Checkout Section -->
            <div class="section">
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                        <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                    </div>
                    <div>
                        <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                        <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                    </div>
                </div>
            </div>
    
            <!-- Guests & Confirmation Code -->
            <div class="section">
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                        <p style="margin-bottom: 0;">{{guests}}</p>
                    </div>
                    <div>
                        <p style="font-weight: 600; margin-bottom: 0;">Confirmation Code</p>
                        <p style="margin-bottom: 0;">{{confirmation_code}}</p>
                    </div>
                </div>
            </div>
    
            
    
            <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}
    
            <!-- Support Section -->
            <div class="section" style="text-align: center;">
                <h1 class="h1">Customer Support</h1>
                <p>
                    <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                    <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
                </p>
            </div>
    
            <!-- Footer -->
            <hr>
            <div style="text-align: left; padding: 16px;">
                <h3>Price Details</h3>
                {{{price_details}}}
            </div>
            <div style="text-align: center; padding-top: 15px;">
                <div style="padding-top: 10px;">
                            <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                                <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                            </a>
                            <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                                <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                            </a>
                            <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                                <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                            </a>
                            <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                                <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                            </a>
                            <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                                <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                            </a>
                            <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                                <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                            </a>
                </div>
                <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
            </div>
        </div>
    </body>
    </html>
    `,
		status: true,
	},
	{
		id: 12,
		name: "bookingCancelled",
		htmlContent: `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{subject}}</title>
        <style>
            body {
                background-color: #F4F4F4;
                margin: 0;
                padding: 0;
                color: #484848;
                font-family: 'Arial', sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #fefefe;
            }
            .btn {
                width: 100%;
                box-sizing: border-box;
                padding: 12px 25px;
                display: inline-block;
                border-radius: 5px;
                text-align: center;
                text-decoration: none;
            }
            .btn-primary {
                background-color: #e57c39;
                color: #ffffff;
                border: 1px solid #e57c39;
            }
            .btn-secondary {
                background-color: #ffffff;
                color: #e57c39;
                border: 1px solid #e57c39;
            }
            .link {
                color: #e57c39;
                text-decoration: none;
            }
            .h1 {
                font-size: 32px;
                line-height: 36px;
            }
            hr {
                border: 0;
                height: 2px;
                background-color: #cacaca;
                margin: 20px 0;
            }
            .section {
                padding: 16px;
                border-bottom: 1px solid #d2d2d2;
            }
            .image {
                width: 100%;
                height: 400px;
                object-fit: cover;
            }
            .avatar {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div style="text-align: center; padding: 25px 0;">
                <a href="{{website_url}}">
                    <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
                </a>
            </div>
        
                    <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


            <!-- Main Image -->
            <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">
    
            <!-- Content Section -->
            <div class="section">
                <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
                <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
            </div>
    
            
    
            <!-- Checkin/Checkout Section -->
            <div class="section">
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                        <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                    </div>
                    <div>
                        <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                        <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                    </div>
                </div>
            </div>
    
            <!-- Guests & Confirmation Code -->
            <div class="section">
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                        <p style="margin-bottom: 0;">{{guests}}</p>
                    </div>
                    <div>
                        <p style="font-weight: 600; margin-bottom: 0;">Space Type</p>
                        <p style="margin-bottom: 0;">{{space_type}}</p>
                    </div>
                </div>
            </div>
    
            
    
            <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}
    
            <!-- Support Section -->
            <div class="section" style="text-align: center;">
                <h1 class="h1">Customer Support</h1>
                <p>
                    <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                    <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
                </p>
            </div>
    
            <!-- Footer -->
            <hr>            
            <div style="text-align: center; padding-top: 15px;">
                <div style="padding-top: 10px;">
                            <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                                <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                            </a>
                            <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                                <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                            </a>
                            <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                                <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                            </a>
                            <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                                <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                            </a>
                            <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                                <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                            </a>
                            <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                                <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                            </a>
                </div>
                <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
            </div>
        </div>
    </body>
    </html>
    `,
		status: true,
	},
	{
		id: 13,
		name: "newRequestFromGuest",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

                <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>

        

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Space Type</p>
                    <p style="margin-bottom: 0;">{{listing_type}}</p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
<div class="section" style="display: flex; justify-content: center; align-items: center; height: 100%;">
    {{#if message_url}}
    <a href="{{message_url}}" target="_blank" style="padding: 10px 20px; background-color: #e57c39; color: #fff; text-decoration: none; border-radius: 4px; display: inline-block;">{{message_button_txt}}</a>
    {{/if}}
</div>



        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        <div style="text-align: left; padding: 16px;">
            <h3>Price Details</h3>
            {{{price_details}}}
        </div>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 14,
		name: "requestRemainder",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

                <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>


        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Space Type</p>
                    <p style="margin-bottom: 0;">{{listing_type}}</p>
                </div>
            </div>
        </div>


        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <p>Respond to {{user_name}} Inquired Going to Expire in {{hours}} Hours!. at {{listing_title}}</p>
            </div>
        </div>


        <!-- Action Buttons -->
        <div class="section" style="display: flex; justify-content: space-between;">
       <a href="{{message_url}}" target="_blank" style="padding: 10px 20px; background-color: #e57c39; color: #fff; text-decoration: none; border-radius: 4px; display: inline-block;">Pre Accept / Decline</a>

        </div>

        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        <div style="text-align: left; padding: 16px;">
            <h3>Price Details</h3>
            {{{price_details}}}
        </div>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 15,
		name: "requestExpired",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

                <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>       

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Space Type</p>
                    <p style="margin-bottom: 0;">{{listing_type}}</p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="section" style="display: flex; justify-content: space-between;">       
            {{#if keep_searching}}
            <a href="{{keep_searching_url}}" target="_blank" style="padding: 10px 20px; background-color: #e57c39; color: #fff; text-decoration: none; border-radius: 4px; display: inline-block;">{{keep_searching}}</a>
            {{/if}}
        </div>

        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>        
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 16,
		name: "requestPreAccepted",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

                <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>

        

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Space Type</p>
                    <p style="margin-bottom: 0;">{{listing_type}}</p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="section" style="display: flex; justify-content: space-between;">
        {{#if message_url}}
            <a href="{{message_url}}" target="_blank" style="padding: 10px 20px; background-color: #e57c39; color: #fff; text-decoration: none; border-radius: 4px; display: inline-block;">Book Now</a>
            {{/if}}
       

        </div>

        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        <div style="text-align: left; padding: 16px;">
            <h3>Price Details</h3>
            {{{price_details}}}
        </div>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 17,
		name: "requestDeclined",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

                <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>
        

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Space Type</p>
                    <p style="margin-bottom: 0;">{{listing_type}}</p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="section" style="display: flex; justify-content: space-between;">       
            {{#if keep_searching}}
            <a href="{{keep_searching_url}}" target="_blank" style="padding: 10px 20px; background-color: #e57c39; color: #fff; text-decoration: none; border-radius: 4px; display: inline-block;">{{keep_searching}}</a>
            {{/if}}
        </div>

        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 18,
		name: "newInquiryFromGuest",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

                <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>

        <!-- Address Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">Address</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{address}}</p>
            <a href="{{directions_url}}" class="link">Get directions</a>
        </div>

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Confirmation Code</p>
                    <p style="margin-bottom: 0;">{{confirmation_code}}</p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="section" style="display: flex; justify-content: space-between;">
       <a href="{{message_url}}" target="_blank" class="btn ">Message To Guest</a>

        </div>

        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        <div style="text-align: left; padding: 16px;">
            <h3>Price Details</h3>
            {{{price_details}}}
        </div>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 19,
		name: "requestPreApproved",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

                <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>

        <!-- Address Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">Address</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{address}}</p>
            <a href="{{directions_url}}" class="link">Get directions</a>
        </div>

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Confirmation Code</p>
                    <p style="margin-bottom: 0;">{{confirmation_code}}</p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="section" style="display: flex; justify-content: space-between;">
       <a href="{{book_url}}" target="_blank" class="btn ">Book Now</a>

        </div>

        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        <div style="text-align: left; padding: 16px;">
            <h3>Price Details</h3>
            {{{price_details}}}
        </div>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 20,
		name: "specialOfferSent",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

                <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>

        

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Space Type</p>
                    <p style="margin-bottom: 0;">{{listing_type}}</p>
                </div>
            </div>
        </div>

        <div class="section" style="display: flex; justify-content: space-between;">
        <p>{{host_name}} sent you a Special Offer at <strong>{{listing_title}}</strong>. This offer expires in <strong>23 Hours</strong>. Review the reservation details, and book now to accept this rate.</p>
        
        </div>
        <!-- Action Buttons -->
        <div class="section" style="display: flex; justify-content: space-between;">
       <a href="{{message_url}}" target="_blank" style="padding: 10px 20px; background-color: #e57c39; color: #fff; text-decoration: none; border-radius: 4px; display: inline-block;">Book Now</a>

        </div>

        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        <div style="text-align: left; padding: 16px;">
            <h3>Price Details</h3>
            {{{price_details}}}
        </div>
        <div style="text-align: center; padding-top: 15px;">
                <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 21,
		name: "userConversation",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

        
        <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
    </p>
    </div>

    <!-- User Information -->
        {{{user_profile}}}
    {{{host_profile}}}

        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>

        <!-- Address Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">Address</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{address}}</p>
            <a href="{{directions_url}}" class="link">Get directions</a>
        </div>

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Space Type</p>
                    <p style="margin-bottom: 0;">{{listing_type}}</p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="message-box">
                <p style="margin-bottom:0; font-weight: 600;">Message</p>
                <p style="color: #7c7c7c;">{{message}}</p>
                <a href="{{message_url}}" target="_blank" style="padding: 10px 20px; background-color: #e57c39; color: #fff; text-decoration: none; border-radius: 4px; display: inline-block;" >{{message_to_text}}</a>
            </div>


        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 22,
		name: "addAccountDetails",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header img {
            max-width: 100%;
            height: auto;
            margin: 25px 0 16px;
        }
        .content {
            color: #6f6f6f;
            font-size: 16px;
            line-height: 19px;
        }
        .btn {
            display: inline-block;
            width: 100%;
            background-color: #e57c39;
            border: solid 1px #e57c39;
            border-radius: 5px;
            box-sizing: border-box;
            color: white;
            font-weight: bold;
            padding: 12px 25px;
            text-decoration: none;
            text-align: center;
            margin: 16px 0;
        }
        hr {
            border: none;
            background-color: #dbdbdb;
            height: 2px;
            margin: 20px 0;
        }
        .social-icons img {
            width: 40px;
            height: 40px;
            margin: 0 10px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca299;
            font-size: 14px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="container">
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

        <div class="content">
            <h1>Add account details to keep your payouts coming</h1>
            <p>Hi {{name}},</p>
            <p>It's great you're earning on Hyra Space Space — and now it's time to update some of your account details.</p>
            <p>This info is required to keep your payouts coming, so be sure to update your account details. It should only take a few minutes.</p>
            <a href="{{payout_url}}" class="btn">Add account details</a>
            <p>Thanks,</p>
            <p>Hyra Space Team</p>
        </div>
        <hr>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 23,
		name: "payoutIssued",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header img {
            max-width: 100%;
            height: auto;
            margin: 25px 0 16px;
        }
        .content {
            color: #6f6f6f;
            font-size: 16px;
            line-height: 19px;
        }
        .btn {
            display: inline-block;
            width: 100%;
            background-color: #e57c39;
            border: solid 1px #e57c39;
            border-radius: 5px;
            box-sizing: border-box;
            color: white;
            font-weight: bold;
            padding: 12px 25px;
            text-decoration: none;
            text-align: center;
            margin: 16px 0;
        }
        hr {
            border: none;
            background-color: #dbdbdb;
            height: 2px;
            margin: 20px 0;
        }
        .social-icons img {
            width: 40px;
            height: 40px;
            margin: 0 10px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca299;
            font-size: 14px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="container">
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

        <div class="content">
            <p>Hi {{name}},</p>
            <p>We have issued a payout of {{amount}}. This payout should arrive in your account within 3-5 days, taking into consideration weekends and holidays.</p>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                    <tr>
                        <th style="text-align: left; line-height: 28px;">Date</th>
                        <th style="text-align: left; line-height: 28px;">Detail</th>
                        <th style="text-align: left; line-height: 28px;">Amount</th>
                    </tr>
                    <tr>
                        <td style="line-height: 28px;">{{date}}</td>
                        <td style="line-height: 28px;">{{detail}}</td>
                        <td style="line-height: 28px;">{{amount}}</td>
                    </tr>
                </tbody>
            </table>
            <p>You can view the status of your payouts in your <a href="{{transaction_url}}" style="text-decoration: none; color: #e57c39;">Transaction History</a>.</p>
            <p>Thanks,</p>
            <p>Hyra Space Team</p>
        </div>
        <hr>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 24,
		name: "refundProcessed",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header img {
            max-width: 100%;
            height: auto;
            margin: 25px 0 16px;
        }
        .content {
            color: #6f6f6f;
            font-size: 16px;
            line-height: 19px;
        }
        .btn {
            display: inline-block;
            width: 100%;
            background-color: #e57c39;
            border: solid 1px #e57c39;
            border-radius: 5px;
            box-sizing: border-box;
            color: white;
            font-weight: bold;
            padding: 12px 25px;
            text-decoration: none;
            text-align: center;
            margin: 16px 0;
        }
        hr {
            border: none;
            background-color: #dbdbdb;
            height: 2px;
            margin: 20px 0;
        }
        .social-icons img {
            width: 40px;
            height: 40px;
            margin: 0 10px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca299;
            font-size: 14px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="container">
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

        <div class="content">
            <p>Hi {{name}},</p>
            <p>A refund of {{amount}} has been issued to your Account on {{date}} for reservation at {{detail}}. While this refund is immediate on our part, it can take up to 3-5 business days for the refund to be reflected in your account..</p>
            <p>Thanks,</p>
            <p>Hyra Space Team</p>
        </div>
        <hr>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 25,
		name: "writeReview",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header img {
            max-width: 100%;
            height: auto;
            margin: 25px 0 16px;
        }
        .content {
            color: #6f6f6f;
            font-size: 16px;
            line-height: 19px;
        }
        .btn {
            display: inline-block;
            width: 100%;
            background-color: #e57c39;
            border: solid 1px #e57c39;
            border-radius: 5px;
            box-sizing: border-box;
            color: white;
            font-weight: bold;
            padding: 12px 25px;
            text-decoration: none;
            text-align: center;
            margin: 16px 0;
        }
        hr {
            border: none;
            background-color: #dbdbdb;
            height: 2px;
            margin: 20px 0;
        }
        .social-icons img {
            width: 40px;
            height: 40px;
            margin: 0 10px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca299;
            font-size: 14px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="container">
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

        <div class="content">
            <p>Hi {{name}},</p>
            <p>Please leave a review for {{user_name}}. You each have 14 days to complete your reviews. When they're both done, or at the end of the review period, you will be able to see what the other wrote.</p>
            <a href="{{review_link}}" target="_blank" style="padding: 10px 20px; background-color: #e57c39; color: #fff; text-decoration: none; border-radius: 4px; display: inline-block;" >Leave a Review</a>
            <p>Thanks,</p>
            <p>Hyra Space Team</p>
        </div>
        <hr>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 26,
		name: "readOrWriteReview",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header img {
            max-width: 100%;
            height: auto;
            margin: 25px 0 16px;
        }
        .content {
            color: #6f6f6f;
            font-size: 16px;
            line-height: 19px;
        }
        .btn {
            display: inline-block;
            width: 100%;
            background-color: #e57c39;
            border: solid 1px #e57c39;
            border-radius: 5px;
            box-sizing: border-box;
            color: white;
            font-weight: bold;
            padding: 12px 25px;
            text-decoration: none;
            text-align: center;
            margin: 16px 0;
        }
        hr {
            border: none;
            background-color: #dbdbdb;
            height: 2px;
            margin: 20px 0;
        }
        .social-icons img {
            width: 40px;
            height: 40px;
            margin: 0 10px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca299;
            font-size: 14px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="container">
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
 <hr>
        
          <div class="center">
            <img src="{{user_image}}" alt="{{user_name}}" style="border-radius: 50%; width: 100px; height: 100px;">
            <h1 class="h1">{{user_name}}</h1>
            <p>Hyra Space Member Since {{member_since}}</p>
            <h2>Here's what {{user_name}} wrote</h2>
        </div>
        

        {{#if show}}

        <div style="border: 1px solid #ccc; padding: 20px; text-align: center;">
        {{public}}
        </div>
        <p style="margin: 30px 0;">{{user_name}} private feedback to you:</p>
        <div style="border: 1px solid #ccc; padding: 20px; text-align: center;">
    {{private}}
        </div>
        <p style="margin: 20px 0;">Now that you've both written reviews, we've posted them to your Hyra Space Space profiles.</p>
        <div style="margin-top: 10px; margin-bottom: 10px;">
            <a href="{{write_review_url}}" target="_blank" style="background-color: #e57c39; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; ">Write a Response</a>
        </div>
        <hr>

        {{else}}

         
                    <div align="center" style="border: 1px solid;">
                        <img src="{{protected_image}}" style=" width: 400px; height: 200px;">
                    </div>
                
                
                    <div>
                        <p>You can read {{user_name}}'s review after you rate them.</p>
                    </div>
                
                
                    <div style="margin-top: 10px; margin-bottom: 10px;">
    <a href="{{write_review_url}}" target="_blank" style="background-color: #e57c39; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; ">Write a Review</a>
</div>
                

                {{/if}}

        <div class="center">
            <p>Thanks,</p>
            <p>Hyra Space Team</p>
        </div>
        <hr>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>
`,
		status: true,
	},
	{
		id: 27,
		name: "inviteGuest",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fefefe;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header img {
            max-width: 100%;
            height: auto;
            margin: 25px 0 16px;
        }
        .content {
            text-align: center;
            color: #6f6f6f;
            font-size: 16px;
            line-height: 19px;
        }
        .btn {
            display: inline-block;
            width: 75%;
            background-color: #e57c39;
            border: solid 1px #e57c39;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            padding: 12px 25px;
            text-decoration: none;
            margin: 20px auto;
        }
        hr {
            border: none;
            background-color: #dbdbdb;
            height: 2px;
            margin: 20px 0;
        }
        .social-icons img {
            width: 40px;
            height: 40px;
            margin: 0 10px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca299;
            font-size: 14px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
        <hr>

        <!-- Invitation Section -->
        <div class="content">
            <h1><b>{{user_name}} sent you an invite to Hyra Space!</b></h1>
            <img src="{{user_image}}" alt="{{user_name}}" style="border-radius: 50%; width: 100px; height: 100px; margin: 10px auto;">
            <h5>{{user_name}}</h5>
            <div style="margin: 15px auto; text-align: start; width: 75%;">
                <span>Referral Code:</span>
                <span style="font-weight: bold; color: black; margin-left: 15px;">{{referral_code}}</span>
            </div>
            <a href="{{invitation_link}}" class="btn">Accept Invitation</a>
        </div>
        <hr>

        <!-- Support Section -->
        <div class="content">
            <h2>Customer Support</h2>
            <p>
                <a href="{{help_center_url}}" style="color: #006259; text-decoration: none;">View Help Center</a> •
                <a href="{{contact_us_url}}" style="color: #006259; text-decoration: none;">Contact Hyra Space</a>
            </p>
        </div>
        <hr>

        <!-- Footer Section -->
        <div class="footer">
            <p>Sent with ❤ from Hyra Space</p>
            <div class="social-icons">
                <a href="{{facebook_url}}" title="Facebook" target="_blank">
                    <img src="{{facebook_image}}" alt="Facebook">
                </a>
                <a href="{{instagram_url}}" title="Instagram" target="_blank">
                    <img src="{{instagram_image}}" alt="Instagram">
                </a>
                <a href="{{twitter_url}}" title="Twitter" target="_blank">
                    <img src="{{twitter_image}}" alt="Twitter">
                </a>
                <a href="{{linkedin_url}}" title="LinkedIn" target="_blank">
                    <img src="{{linkedin_image}}" alt="LinkedIn">
                </a>
                <a href="{{youtube_url}}" title="YouTube" target="_blank">
                    <img src="{{youtube_image}}" alt="YouTube">
                </a>
            </div>
        </div>
    </div>
</body>
</html>

`,
		status: true,
	},
	{
		id: 28,
		name: "earnings",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fefefe;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header img {
            max-width: 100%;
            height: auto;
            margin: 25px 0 16px;
        }
        .content {
            text-align: center;
            color: #6f6f6f;
            font-size: 16px;
            line-height: 19px;
        }
        .btn {
            display: inline-block;
            width: 75%;
            background-color: #e57c39;
            border: solid 1px #e57c39;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            padding: 12px 25px;
            text-decoration: none;
            margin: 20px auto;
        }
        hr {
            border: none;
            background-color: #dbdbdb;
            height: 2px;
            margin: 20px 0;
        }
        .social-icons img {
            width: 40px;
            height: 40px;
            margin: 0 10px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca299;
            font-size: 14px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
        <hr>

        <div class="content">
            <h3>You just earned in Hyra Space credits</h3>
            <p>Hi, {{name}}</p>
            <p>Congratulations! You just checked in to your first business trip. Here’s a coupon you can use towards your next booking.</p>
        </div>
        <div class="btn">
            <a href="#">Use Your Coupon</a>
        </div>
        <!-- Footer Section -->
        <div class="footer">
            <p>Sent with ❤ from Hyra Space</p>
            <div class="social-icons">
                <a href="{{facebook_url}}" title="Facebook" target="_blank">
                    <img src="{{facebook_image}}" alt="Facebook">
                </a>
                <a href="{{instagram_url}}" title="Instagram" target="_blank">
                    <img src="{{instagram_image}}" alt="Instagram">
                </a>
                <a href="{{twitter_url}}" title="Twitter" target="_blank">
                    <img src="{{twitter_image}}" alt="Twitter">
                </a>
                <a href="{{linkedin_url}}" title="LinkedIn" target="_blank">
                    <img src="{{linkedin_image}}" alt="LinkedIn">
                </a>
                <a href="{{youtube_url}}" title="YouTube" target="_blank">
                    <img src="{{youtube_image}}" alt="YouTube">
                </a>
            </div>
        </div>
    </div>
</body>
</html>

`,
		status: true,
	},
	{
		id: 29,
		name: "adminResubmitListing",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fefefe;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header img {
            max-width: 100%;
            height: auto;
            margin: 25px 0 16px;
        }
        .content {
            text-align: center;
            color: #6f6f6f;
            font-size: 16px;
            line-height: 19px;
        }
        .btn {
            display: inline-block;
            width: 75%;
            background-color: #e57c39;
            border: solid 1px #e57c39;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            padding: 12px 25px;
            text-decoration: none;
            margin: 20px auto;
        }
        hr {
            border: none;
            background-color: #dbdbdb;
            height: 2px;
            margin: 20px 0;
        }
        .social-icons img {
            width: 40px;
            height: 40px;
            margin: 0 10px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #9ca299;
            font-size: 14px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header" style="text-align: center;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>
        <hr>

         <div class="content">
            <p>Hi <strong>{{name}}</strong>,</p>
            <p>
                Your listing has been pending by admin: 
                <a class="link" href="#">{{room_name}}</a>
            </p>
            <p><strong>Resubmit Reason:</strong></p>
            <p>{{resubmit_reason}}</p>
            <p>
                Go to your <strong>Manage Listings Menu</strong> and update your listing to activate it.
            </p>
            
            <hr>
            <p>Thanks,</p>
            <p>Hyra Space Team</p>
        </div>
        
        <!-- Footer Section -->
       <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>

`,
		status: true,
	},
	{
		id: 30,
		name: "disputeRequest",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

                <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>

        <!-- Address Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">Address</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{address}}</p>
            <a href="{{directions_url}}" class="link">Get directions</a>
        </div>

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Confirmation Code</p>
                    <p style="margin-bottom: 0;">{{confirmation_code}}</p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="section" style="display: flex; justify-content: space-between;">
            <a href="{{message_url}}" class="btn btn-primary">Message To Host</a>            
        </div>

        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        <div style="text-align: left; padding: 16px;">
            <h3>Price Details</h3>
            {{{price_details}}}
        </div>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>

`,
		status: true,
	},
	{
		id: 31,
		name: "acceptRequest",
		htmlContent: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
            color: #484848;
            font-family: 'Arial', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fefefe;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 25px;
            display: inline-block;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
        }
        .btn-primary {
            background-color: #e57c39;
            color: #ffffff;
            border: 1px solid #e57c39;
        }
        .btn-secondary {
            background-color: #ffffff;
            color: #e57c39;
            border: 1px solid #e57c39;
        }
        .link {
            color: #e57c39;
            text-decoration: none;
        }
        .h1 {
            font-size: 32px;
            line-height: 36px;
        }
        hr {
            border: 0;
            height: 2px;
            background-color: #cacaca;
            margin: 20px 0;
        }
        .section {
            padding: 16px;
            border-bottom: 1px solid #d2d2d2;
        }
        .image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div style="text-align: center; padding: 25px 0;">
            <a href="{{website_url}}">
                <img src="{{logo_url}}" alt="Logo" style="max-height: 50px;">
            </a>
        </div>

                <!--subject header-->
        <div style="width: 100%; font-family: Arial, sans-serif; padding: 20px; text-align: center; box-sizing: border-box;">
  <h1 style="font-size: 36px; line-height: 40px; margin: 10px 0; color: #333333;">
    {{subject_header}}
  </h1>
  <p style="margin: 0; font-size: 16px; line-height: 24px; color: #555555;">
    {{sub_subject}}
  </p>
</div>


        <!-- Main Image -->
        <img src="{{main_image_url}}" alt="{{main_image_alt}}" class="image">

        <!-- Content Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">{{listing_title}}</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{listing_type}}</p>
        </div>

        <!-- Address Section -->
        <div class="section">
            <p style="font-weight: 600; margin-bottom: 0;">Address</p>
            <p style="color: #7c7c7c; margin-bottom: 0;">{{address}}</p>
            <a href="{{directions_url}}" class="link">Get directions</a>
        </div>

        <!-- Checkin/Checkout Section -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkin</p>
                    <p style="margin-bottom: 0;">{{checkin_date}} ({{checkin_flexibility}})</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Checkout</p>
                    <p style="margin-bottom: 0;">{{checkout_date}} ({{checkout_flexibility}})</p>
                </div>
            </div>
        </div>

        <!-- Guests & Confirmation Code -->
        <div class="section">
            <div style="display: flex; justify-content: space-between;">
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Guests</p>
                    <p style="margin-bottom: 0;">{{guests}}</p>
                </div>
                <div>
                    <p style="font-weight: 600; margin-bottom: 0;">Confirmation Code</p>
                    <p style="margin-bottom: 0;">{{confirmation_code}}</p>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="section" style="display: flex; justify-content: space-between;">
            <a href="{{message_url}}" class="btn btn-primary">Message To Host</a>            
        </div>

        <!-- User Information -->
        {{{user_profile}}}
        {{{host_profile}}}

        <!-- Support Section -->
        <div class="section" style="text-align: center;">
            <h1 class="h1">Customer Support</h1>
            <p>
                <a href="{{help_center_url}}" class="link">View Help Center</a> • 
                <a href="{{contact_us_url}}" class="link">Contact Hyra Space</a>
            </p>
        </div>

        <!-- Footer -->
        <hr>
        <div style="text-align: left; padding: 16px;">
            <h3>Price Details</h3>
            {{{price_details}}}
        </div>
        <div style="text-align: center; padding-top: 15px;">
            <div style="padding-top: 10px;">
                        <a href="{{facebook_url}}" title="Facebook" target="_blank" rel="noreferrer">
                            <img src="{{facebook_image}}" alt="Facebook" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{instagram_url}}" title="Instagram" target="_blank" rel="noreferrer">
                            <img src="{{instagram_image}}" alt="Instagram" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{twitter_url}}" title="Twitter" target="_blank" rel="noreferrer">
                            <img src="{{twitter_image}}" alt="Twitter" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{linkedin_url}}" title="Linkedin" target="_blank" rel="noreferrer">
                            <img src="{{linkedin_image}}" alt="Linkedin" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{pintrest_url}}" title="Pinterest" target="_blank" rel="noreferrer">
                            <img src="{{pintrest_image}}" alt="Pinterest" height="40" width="40" style="margin: 0 10px;">
                        </a>
                        <a href="{{youtube_url}}" title="Youtube" target="_blank" rel="noreferrer">
                            <img src="{{youtube_image}}" alt="Youtube" height="40" width="40" style="margin: 0 10px;">
                        </a>
            </div>
            <p style="margin:0;text-align:center;margin-bottom:10px;font-family:'Cereal','Helvetica',Helvetica,Arial,sans-serif;color:#9ca299;font-size:14px;font-weight:300;line-height:1.4">Sent with ❤ from Hyra Space</p>
        </div>
    </div>
</body>
</html>

`,
		status: true,
	},
];

export default async () => {
	try {
		console.log("Running Email Management Seeder");

		// Clear existing data
		await EmailManagement.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await EmailManagement.create(item);
		}

		console.log("Email Management Seeding completed successfully");
	} catch (error) {
		console.error("Email Management Seeding failed:", error);
	}
};
