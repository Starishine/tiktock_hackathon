import torch
from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
from flask_cors import CORS

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-1.3B")
model = AutoModelForCausalLM.from_pretrained("EleutherAI/gpt-neo-1.3B", torch_dtype=torch.float16).to(device)
model.eval()

def generate_script(role: str, content: str) -> str:
    # Simple prompt with role
    prompt = {content}

    # Tokenize input
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    # Generate output
    with torch.no_grad():
        output_ids = model.generate(
            **inputs,
            max_new_tokens=300,
            min_new_tokens=50,
            eos_token_id=tokenizer.eos_token_id,
            do_sample=True,
            top_p=0.9,
            temperature=0.8
        )

    return tokenizer.decode(output_ids[0], skip_special_tokens=True).strip()


app = Flask(__name__)
CORS(app)


# POST /scriptgen JSON: {"role":"user", "content":"Tell me a joke"}
@app.route("/scriptgen/<userInput>")
def scriptgen_post(userInput):
    role = "content creator"
    content = userInput
    return generate_script(role, content)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)