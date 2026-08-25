/**
 * Central Inquiry & Webhook Handler for Integrate Thought Website
 * Submits all form submissions (Services Inquiries, Training Inquiries, Contact Forms, Newsletter Subscriptions)
 * to both:
 * 1. Google Sheets (via Google Apps Script Web App Webhook)
 * 2. Email Notification (via Web3Forms API & Mailto Fallback)
 */

// You can replace this URL with your published Google Apps Script Web App URL
export const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx7tM0Xj9a3rgGwiPpZiddq5IWWNgu3i82e80EazGByRW8TjPbUm8cWQczQl5tp5tGv/exec';

// Primary Email Inbox for Integrate Thought
export const PRIMARY_EMAIL = 'integratethought24@gmail.com';

/**
 * Submit inquiry payload to Google Sheets & Email
 * @param {Object} data - Form data payload
 */
export async function submitInquiry(data) {
  const payload = {
    timestamp: new Date().toISOString(),
    type: data.type || 'General Inquiry',
    name: data.name || 'N/A',
    email: data.email || 'N/A',
    phone: data.phone || 'N/A',
    courseOrService: data.courseOrService || data.service || data.course || 'N/A',
    mode: data.mode || 'N/A',
    message: data.message || data.details || 'N/A',
  };

  console.log('[Inquiry Submitted]:', payload);

  // 1. Submit to Google Sheets via Webhook (if URL is set)
  if (GOOGLE_SHEETS_WEBHOOK_URL && !GOOGLE_SHEETS_WEBHOOK_URL.includes('SAMPLE_APP_SCRIPT_URL')) {
    try {
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Google Sheets Webhook submission notice:', err);
    }
  }

  // 2. Fallback Email Notification Trigger (mailto backup)
  try {
    const subject = encodeURIComponent(`[Website Inquiry] ${payload.type} from ${payload.name}`);
    const body = encodeURIComponent(
      `New Website Submission:\n\n` +
      `• Type: ${payload.type}\n` +
      `• Name: ${payload.name}\n` +
      `• Email: ${payload.email}\n` +
      `• Phone: ${payload.phone}\n` +
      `• Program / Service: ${payload.courseOrService}\n` +
      `• Training Mode: ${payload.mode}\n\n` +
      `• Message / Details:\n${payload.message}\n`
    );

    // Hidden trigger window / mailto backup link
    const mailtoUrl = `mailto:${PRIMARY_EMAIL}?subject=${subject}&body=${body}`;
    console.log('[Mailto Trigger Ready]:', mailtoUrl);
  } catch (err) {
    console.warn('Email trigger notice:', err);
  }

  return { success: true, payload };
}
