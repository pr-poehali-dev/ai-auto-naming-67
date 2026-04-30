"""Чат с ИИ 67 через OpenAI GPT-4o-mini"""
import json
import os
from openai import OpenAI


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    messages = body.get("messages", [])

    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "Ты — ИИ 67, умный и дружелюбный ассистент. Отвечай кратко и по делу на русском языке.",
            },
            *messages,
        ],
        max_tokens=1000,
    )

    reply = response.choices[0].message.content

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"reply": reply}, ensure_ascii=False),
    }
