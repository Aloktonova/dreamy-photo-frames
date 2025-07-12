import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

# Load your prompt
with open("scripts/prompt.txt", "r") as file:
    prompt = file.read()

# Call OpenAI API
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful developer assistant."},
        {"role": "user", "content": prompt}
    ]
)

code = response.choices[0].message.content.strip()

# Save to a file
with open("src/lib/GeneratedComponent.svelte", "w") as f:
    f.write(code)

print("✅ Code written to src/lib/GeneratedComponent.svelte")
