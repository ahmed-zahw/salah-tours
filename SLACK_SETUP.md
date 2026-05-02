# Slack Integration Setup

## Setting up Slack Webhook for Booking Notifications

This application sends booking notifications to Slack. Follow these steps to set it up:

### 1. Create a Slack Webhook

1. Go to [https://api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks)
2. Click **"Create your Slack app"**
3. Choose **"From scratch"**
4. Name your app (e.g., "Salah Tours Bookings")
5. Select your Slack workspace
6. Click **"Create App"**

### 2. Enable Incoming Webhooks

1. In your app settings, click on **"Incoming Webhooks"**
2. Toggle **"Activate Incoming Webhooks"** to **On**
3. Click **"Add New Webhook to Workspace"**
4. Select the channel where you want to receive booking notifications (e.g., #bookings, #sales)
5. Click **"Allow"**

### 3. Copy Your Webhook URL

1. You'll see your new webhook URL listed
2. It will look like: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX`
3. Click **"Copy"** to copy the URL

### 4. Update Environment Variables

1. Open `.env.local` in your project
2. Replace the placeholder with your actual webhook URL:
   ```
   SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/ACTUAL/WEBHOOK/URL"
   ```
3. Save the file
4. Restart your development server

### 5. Test the Integration

1. Go to your tour booking page
2. Fill out and submit a booking form
3. Check your Slack channel for the notification!

## Notification Format

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

## Troubleshooting

- **Not receiving notifications?** 
  - Check that your webhook URL is correct in `.env.local`
  - Verify you've restarted your dev server after updating `.env.local`
  - Check the console for any error messages

- **Messages going to wrong channel?**
  - Create a new webhook for the desired channel
  - Update the webhook URL in `.env.local`

## Security Note

⚠️ **Never commit `.env.local` to version control!** It contains sensitive credentials.

Make sure `.env.local` is in your `.gitignore` file.
