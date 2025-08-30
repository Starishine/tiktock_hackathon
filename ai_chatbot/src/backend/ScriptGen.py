import torch
from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-1.3B")
model = AutoModelForCausalLM.from_pretrained("EleutherAI/gpt-neo-1.3B", torch_dtype=torch.float16).to(device)
model.eval()

def generate_script(role: str, content: str) -> str:
    # Simple prompt with role
    prompt = f"{role}: {content}"

    # Tokenize input
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    # Generate output
    with torch.no_grad():
        output_ids = model.generate(
            **inputs,
            max_new_tokens=150,
            min_new_tokens=50,
            do_sample=True,
            top_p=0.9,
            temperature=0.8
        )

    return tokenizer.decode(output_ids[0], skip_special_tokens=True).strip()


app = Flask(__name__)

# GET /scriptgen?q=topic&role=user
@app.route("/scriptgen", methods=["GET"])
def scriptgen_get():
    role = request.args.get("role", "")
    content = request.args.get("content", "")
    if not role or not content:
        return jsonify({"error": "Missing ?role=<role>&content=<content>"}), 400
    return jsonify({"prompt": content, "output": generate_script(role, content)})


# POST /scriptgen JSON: {"role":"user", "content":"Tell me a joke"}
@app.route("/scriptgen", methods=["POST"])
def scriptgen_post():
    data = request.get_json(silent=True) or {}
    role = data.get("role", "")
    content = data.get("content", "")
    if not role or not content:
        return jsonify({"error": "JSON must include 'role' and 'content'"}), 400
    return jsonify({"prompt": content, "output": generate_script(role, content)})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)