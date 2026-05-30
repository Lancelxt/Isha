import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, phone, signageType, message } = await request.json();

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8080';
    
    // 1. Persist to WordPress Database as a "Comment" lead
    // Attached to post ID 1 (default Hello World post in any fresh WP setup)
    const wpCommentBody = {
      post: 1,
      author_name: name,
      author_email: email,
      content: `
[LEAD INQUIRY FORM SUBMISSION]
📞 Phone: ${phone || 'Not provided'}
🏷️ Signage Type: ${signageType}
💬 Project Details:
${message}
      `.trim()
    };

    let wpSaved = false;
    let wpErrorMsg = '';

    try {
      const wpResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wpCommentBody),
      });

      if (wpResponse.ok) {
        wpSaved = true;
      } else {
        const errText = await wpResponse.text();
        wpErrorMsg = `WordPress returned status ${wpResponse.status}: ${errText}`;
        console.warn('WordPress leads database warning:', wpErrorMsg);
      }
    } catch (wpError: any) {
      wpErrorMsg = wpError?.message || 'Connection failed';
      console.error('Failed to connect to WordPress database:', wpError);
    }

    // 2. Trigger Resend Email Notification (Optional - if key exists)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    let emailSent = false;
    let emailErrorMsg = '';

    if (RESEND_API_KEY) {
      const emailHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f0e6d4; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #D45C2A 0%, #F5A623 100%); padding: 2rem; text-align: center; color: #FFFFFF;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">New Project Lead Captured!</h1>
            <p style="margin: 0.5rem 0 0 0; font-size: 14px; opacity: 0.9;">ISHA Signage Studio Leads</p>
          </div>
          
          <!-- Content Body -->
          <div style="padding: 2.5rem; background-color: #FFFFFF; color: #1E1E2A;">
            <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">You have received a new consultation request from your website contact form:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
              <tr>
                <td style="padding: 0.75rem 0; border-bottom: 1px solid #f0e6d4; font-weight: 600; color: #8E8E9E; width: 140px;">Client Name</td>
                <td style="padding: 0.75rem 0; border-bottom: 1px solid #f0e6d4; font-weight: 600; color: #1E1E2A;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem 0; border-bottom: 1px solid #f0e6d4; font-weight: 600; color: #8E8E9E;">Email Address</td>
                <td style="padding: 0.75rem 0; border-bottom: 1px solid #f0e6d4; color: #D45C2A; font-weight: 500;">
                  <a href="mailto:${email}" style="color: #D45C2A; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 0.75rem 0; border-bottom: 1px solid #f0e6d4; font-weight: 600; color: #8E8E9E;">Phone Number</td>
                <td style="padding: 0.75rem 0; border-bottom: 1px solid #f0e6d4; color: #1E1E2A;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem 0; border-bottom: 1px solid #f0e6d4; font-weight: 600; color: #8E8E9E;">Signage Interest</td>
                <td style="padding: 0.75rem 0; border-bottom: 1px solid #f0e6d4; color: #1E1E2A; font-weight: 600;">
                  <span style="background-color: #FDE6D4; color: #D45C2A; padding: 0.35rem 0.75rem; border-radius: 50px; font-size: 12px; font-weight: bold;">
                    ${signageType.toUpperCase()}
                  </span>
                </td>
              </tr>
            </table>

            <div style="background-color: #fff8f4; border-left: 4px solid #D45C2A; padding: 1.5rem; border-radius: 0 12px 12px 0; margin-bottom: 2rem;">
              <h4 style="margin: 0 0 0.5rem 0; color: #D45C2A; font-size: 14px;">Project Specifications:</h4>
              <p style="margin: 0; font-size: 15px; line-height: 1.6; font-style: italic; color: #4A4A5A;">"${message}"</p>
            </div>
            
            <div style="text-align: center; margin-top: 2.5rem;">
              <a href="${WORDPRESS_URL}/wp-admin/edit-comments.php" style="background: linear-gradient(135deg, #D45C2A 0%, #F5A623 100%); color: #FFFFFF; padding: 0.9rem 2.2rem; border-radius: 50px; text-decoration: none; font-weight: 600; display: inline-block; box-shadow: 0 4px 12px rgba(212, 92, 42, 0.2);">
                View Lead inside WordPress Dashboard
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #F8F6F4; padding: 1.5rem; text-align: center; font-size: 12px; color: #8E8E9E; border-top: 1px solid #f0e6d4;">
            <p style="margin: 0;">This notification was sent dynamically from your headless Next.js server.</p>
          </div>
        </div>
      `;

      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'ISHA Signage Leads <onboarding@resend.dev>',
            to: 'hello@ishasigns.com',
            subject: `🔥 New Signage Inquiry: ${name} [${signageType}]`,
            html: emailHtml,
          }),
        });

        if (resendResponse.ok) {
          emailSent = true;
        } else {
          const errText = await resendResponse.text();
          emailErrorMsg = `Resend API returned status ${resendResponse.status}: ${errText}`;
          console.error(emailErrorMsg);
        }
      } catch (emailError: any) {
        emailErrorMsg = emailError?.message || 'Connection failed';
        console.error('Failed to send lead email via Resend:', emailError);
      }
    } else {
      console.log('[Resend API] Skipping email notification. RESEND_API_KEY environment variable is not defined.');
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted successfully!',
      wpSaved,
      emailSent,
      wpError: wpSaved ? undefined : wpErrorMsg,
      emailError: emailSent || !RESEND_API_KEY ? undefined : emailErrorMsg
    });

  } catch (error: any) {
    console.error('API Contact route error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
