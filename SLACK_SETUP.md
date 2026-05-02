# Slack Integration Setup

## Setting up Slack Webhooks for Notifications

This application sends notifications to Slack for:
1. **Tour Bookings** - When customers book a tour
2. **Contact Form Submissions** - When customers submit the contact form

Follow these steps to set it up:

### 1. Create Slack Webhooks

1. Go to [https://api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks)
2. Click **"Create your Slack app"**
3. Choose **"From scratch"**
4. Name your app (e.g., "Salah Tours Notifications")
5. Select your Slack workspace
6. Click **"Create App"**

### 2. Enable Incoming Webhooks

1. In your app settings, click on **"Incoming Webhooks"**
2. Toggle **"Activate Incoming Webhooks"** to **On**
3. Click **"Add New Webhook to Workspace"**
4. Select the channel where you want to receive **booking** notifications (e.g., #bookings, #sales)
5. Click **"Allow"**
6. Copy the webhook URL - this is your **SLACK_BOOKING_WEBHOOK_URL**

### 3. Create Second Webhook for Contact Forms

1. Still in "Incoming Webhooks", click **"Add New Webhook to Workspace"** again
2. Select the channel where you want to receive **contact form** submissions (e.g., #contact-forms, #inquiries)
3. Click **"Allow"**
4. Copy this webhook URL - this is your **SLACK_CONTACT_WEBHOOK_URL**

### 4. Update Environment Variables

1. Open `.env.local` in your project
2. Replace the placeholders with your actual webhook URLs:
   ```
   # For tour bookings
   SLACK_BOOKING_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/BOOKING/WEBHOOK/URL"
   
   # For contact form submissions
   SLACK_CONTACT_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/CONTACT/WEBHOOK/URL"
   ```
3. Save the file
4. Restart your development server

### 5. Test the Integrations

**Test Booking Notifications:**
1. Go to any tour booking page
2. Fill out and submit a booking form
3. Check your bookings Slack channel for the notification!

**Test Contact Form Notifications:**
1. Go to the Contact Us page
2. Fill out and submit the contact form
3. Check your contact forms Slack channel for the notification!

## Notification Formats

### Booking Notification
When a booking is received, Slack will display:
- 🎉 Heading: "New Tour Booking"
- Customer Name
- Email
- Phone Number
- Number of People
- Tour Date
- Tour ID
- Special Requirements (if provided)
- Timestamp

### Contact Form Notification
When a contact form is submitted, Slack will display:
- 📩 Heading: "New Contact Form Submission"
- Name
- Email
- Phone (if provided)
- Subject
- Message
- Timestamp

## Troubleshooting

- **Not receiving notifications?** 
  - Check that your webhook URLs are correct in `.env.local`
  - Verify you've restarted your dev server after updating `.env.local`
  - Check the console for any error messages

- **Messages going to wrong channel?**
  - Create a new webhook for the desired channel
  - Update the webhook URL in `.env.local`

- **Want to use the same channel for both?**
  - You can use the same webhook URL for both `SLACK_BOOKING_WEBHOOK_URL` and `SLACK_CONTACT_WEBHOOK_URL`
  - The notifications will be differentiated by their headings and content

## Security Note

⚠️ **Never commit `.env.local` to version control!** It contains sensitive credentials.

Make sure `.env.local` is in your `.gitignore` file.
