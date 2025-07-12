import openai
import os

# Load your key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Example call to GPT-4
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful code assistant."},
        {"role": "user", "content": "Generate Svelte code for a 3x3 image grid with drag-and-drop support."}
    ]
)

print(response["choices"][0]["message"]["content"])
