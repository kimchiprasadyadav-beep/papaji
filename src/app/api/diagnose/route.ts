import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();
    if (!image) return NextResponse.json({ error: "No image provided" }, { status: 400 });

    const base64 = image.replace(/^data:image\/\w+;base64,/, "");
    const mediaType = image.match(/^data:(image\/\w+);/)?.[1] || "image/jpeg";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: base64 },
              },
              {
                type: "text",
                text: `You are PapaJi — a wise, experienced Indian father who can fix anything around the house. You've been fixing things for 30+ years. Analyze this image and diagnose the problem.

Respond ONLY with valid JSON (no markdown, no backticks):
{
  "problem": "Clear description of what's broken/wrong",
  "difficulty": 1-5 (1=easy, 5=call professional),
  "tools": ["tool1", "tool2"],
  "steps": ["Step 1 instruction", "Step 2 instruction"],
  "parts": [{"name": "Part name", "estimatedCost": "₹XX-₹XX"}],
  "safetyWarnings": ["Warning if any, or empty array"],
  "dadAdvice": "A warm, encouraging closing line in PapaJi's voice mixing Hindi and English"
}

Be practical, accurate, and warm. If the image doesn't show anything broken, still give helpful maintenance advice about what you see.`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return NextResponse.json({ error: "PapaJi thak gaye, try again!" }, { status: 500 });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "PapaJi confused ho gaye!" }, { status: 500 });
    }

    const diagnosis = JSON.parse(jsonMatch[0]);
    return NextResponse.json(diagnosis);
  } catch (err) {
    console.error("Diagnosis error:", err);
    return NextResponse.json({ error: "Kuch toh gadbad hai! Try again." }, { status: 500 });
  }
}
