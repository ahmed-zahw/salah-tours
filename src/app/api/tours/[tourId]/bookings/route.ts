import { NextRequest, NextResponse } from "next/server";
import { IncomingWebhook } from "@slack/webhook";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ tourId: string }> },
) {
  try {
    const tourId = (await params).tourId;
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      numberOfPeople,
      date,
      specialRequirements,
    } = body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !numberOfPeople ||
      !date
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Send notification to Slack
    const slackWebhookUrl = process.env.SLACK_BOOKING_WEBHOOK_URL;

    if (slackWebhookUrl) {
      try {
        const webhook = new IncomingWebhook(slackWebhookUrl);

        await webhook.send({
          text: "🎉 New Tour Booking Received!",
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🎉 New Tour Booking",
                emoji: true,
              },
            },
            {
              type: "section",
              fields: [
                {
                  type: "mrkdwn",
                  text: `*Customer Name:*\n${firstName} ${lastName}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Email:*\n${email}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Phone:*\n${phone}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Number of People:*\n${numberOfPeople}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Tour Date:*\n${date}`,
                },
                {
                  type: "mrkdwn",
                  text: `*Tour ID:*\n${tourId}`,
                },
              ],
            },
            ...(specialRequirements
              ? ([
                  {
                    type: "section",
                    fields: [
                      {
                        type: "mrkdwn",
                        text: `*Special Requirements:*\n${specialRequirements}`,
                      },
                    ],
                  },
                ] as any)
              : []),
            {
              type: "divider",
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `Booking submitted at ${new Date().toLocaleString()}`,
                },
              ],
            },
          ],
        });
      } catch (slackError) {
        console.error("Failed to send Slack notification:", slackError);
        // Don't fail the booking if Slack notification fails
      }
    } else {
      console.warn(
        "SLACK_BOOKING_WEBHOOK_URL not configured - skipping Slack notification",
      );
    }

    // Here you would typically save the booking to your database
    // For now, we'll just return success
    return NextResponse.json(
      {
        success: true,
        message: "Booking submitted successfully",
        booking: {
          tourId,
          firstName,
          lastName,
          email,
          phone,
          numberOfPeople,
          date,
          specialRequirements,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 },
    );
  }
}
