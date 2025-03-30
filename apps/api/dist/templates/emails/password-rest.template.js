"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetTemplate = void 0;
exports.passwordResetTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; border-radius: 5px;">
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: #4a4a4a; text-align: center;">Password Reset Request</h1>
                <p style="margin-bottom: 20px;">Hello,</p>
                <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
                <p>To reset your password, click the button below:</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <a href="{{resetLink}}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                        </td>
                    </tr>
                </table>
                <p>This link will expire in 1 hour for security reasons.</p>
                <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
                <p style="word-break: break-all; color: #4a4a4a;">{{resetLink}}</p>
                <p style="margin-top: 20px;">Best regards,<br>Your App Team</p>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
//# sourceMappingURL=password-rest.template.js.map