"use server";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req) {
  try {
    const { qrData, allergies, imageUrl } = await req.json();

    console.log("QR Data:", qrData);
    console.log("Allergies:", allergies);
    console.log("Image URL:", imageUrl);

    if (!qrData && !imageUrl) {
      return NextResponse.json(
        { error: "Either qrData or imageUrl is required." },
        { status: 400 }
      );
    }

    if (allergies !== undefined && !Array.isArray(allergies)) {
      return NextResponse.json(
        { error: "Allergies must be an array." },
        { status: 400 }
      );
    }

    let messages = [];

    if (qrData) {
      const allergyText =
        allergies && allergies.length > 0
          ? `The user is allergic to ${allergies.join(", ")}.`
          : "Please analyze the potential dangers or risks in this food product.";

      messages.push({
        role: "system",
        content:
          "You are a helpful assistant that identifies food risks and potential allergens.",
      });
      messages.push({
        role: "user",
        content: `Here is the product info from a QR code: "${qrData}". ${allergyText}`,
      });
    }

    if (imageUrl) {
      const allergyText =
        allergies && allergies.length > 0
          ? `The user is allergic to ${allergies.join(
              ", "
            )}. Please check if any visible ingredients could cause issues.`
          : "Please provide a general analysis of any potential dangers or risks visible in this food product.";

      messages.push({
        role: "user",
        content: [
          { type: "text", text: allergyText },
          {
            type: "image_url",
            image_url: { url: imageUrl },
          },
        ],
      });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });
    console.log(response.choices[0].message.content);

    const result = response.choices[0].message.content;

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
