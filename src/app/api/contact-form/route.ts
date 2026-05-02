import { NextResponse } from "next/server";
import { IncomingWebhook } from "@slack/webhook";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message }: ContactFormData = body;

    // Validate required fields
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Name is required and must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.exec(email)) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    if (!subject || subject.length < 3) {
      return NextResponse.json(
        { error: "Subject is required and must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Message is required and must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Send notification to Slack
    const slackWebhookUrl = process.env.SLACK_CONTACT_WEBHOOK_URL;
    
    if (slackWebhookUrl) {
      try {
        const webhook = new IncomingWebhook(slackWebhookUrl);
        
        const fields = [
          {
            type: "mrkdwn" as const,
            text: `*Name:*\n${name}`
          },
          {
            type: "mrkdwn" as const,
            text: `*Email:*\n${email}`
          }
        ];

        if (phone) {
          fields.push({
            type: "mrkdwn" as const,
            text: `*Phone:*\n${phone}`
          });
        }

        fields.push({
          type: "mrkdwn" as const,
          text: `*Subject:*\n${subject}`
        });

        await webhook.send({
          text: "📩 New Contact Form Submission!",
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "📩 New Contact Form Submission",
                emoji: true
              }
            },
            {
              type: "section",
              fields
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Message:*\n${message}`
              }
            },
            {
              type: "divider"
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `Submitted at ${new Date().toLocaleString()}`
                }
              ]
            }
          ]
        });
      } catch (slackError) {
        console.error("Failed to send Slack notification:", slackError);
        // Don't fail the submission if Slack notification fails
      }
    } else {
      console.warn("SLACK_CONTACT_WEBHOOK_URL not configured - skipping Slack notification");
    }

    return NextResponse.json(
      { 
        success: true,
        message: "Contact form submitted successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
