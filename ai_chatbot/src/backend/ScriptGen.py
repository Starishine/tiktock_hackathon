import torch
from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

MODEL_NAME = "google/flan-t5-base"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME).to(device)
model.eval()

SCRIPT_PROMPT = """Write a {duration}-second {genre} video script.

Constraints:
- Plain text only (no HTML/links)
- Sections:
  Hook (1–2 lines)
  Ingredients/Props (bulleted)
  Steps (numbered, concise)
  Closing CTA (1 line)
- Tone: {tone}
- Audience: {audience}
- Topic: {topic}

Script:
"""

def generate_script(topic: str,
                    duration: int = 60,
                    genre: str = "cooking",
                    tone: str = "neutral",
                    audience: str = "beginners",
                    max_new_tokens: int = 220,
                    temperature: float = 0.8,
                    top_p: float = 0.9):
                    
    prompt = SCRIPT_PROMPT.format(
        duration=duration, genre=genre, tone=tone, audience=audience, topic=topic
    )
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True).to(device)
    with torch.no_grad():
        output_ids = model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            min_new_tokens=160,
            repetition_penalty=1.2,
            length_penalty=1.0,
            do_sample=True,
            temperature=temperature,
            top_p=top_p,
        )
    return tokenizer.decode(output_ids[0], skip_special_tokens=True).strip()

app = Flask(__name__)

# GET /scriptgen?q=Garlic%20Butter%20Pasta
@app.route("/scriptgen", methods=["GET"])
def scriptgen_get():
    topic = request.args.get("q", "", type=str)
    if not topic:
        return jsonify({"error": "Missing ?q=<topic>"}), 400
    return jsonify({"prompt": topic, "output": generate_script(topic)})

# POST /scriptgen  JSON: {"topic":"...", "duration":60, "genre":"cooking", ...}
@app.route("/scriptgen", methods=["POST"])
def scriptgen_post():
    data = request.get_json(silent=True) or {}
    topic = data.get("topic", "")
    if not topic:
        return jsonify({"error": "JSON must include 'topic'"}), 400
    return jsonify({
        "prompt": topic,
        "output": generate_script(
            topic=topic,
            duration=int(data.get("duration", 60)),
            genre=data.get("genre", "cooking"),
            tone=data.get("tone", "neutral"),
            audience=data.get("audience", "beginners"),
            max_new_tokens=int(data.get("max_new_tokens", 220))
        )
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)