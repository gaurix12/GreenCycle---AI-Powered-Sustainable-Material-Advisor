from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from google import genai
import re
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import io

app = Flask(__name__)
load_dotenv()
CORS(app)

client = genai.Client(api_key=os.getenv("GEMINI_KEY"))
MODEL_PATH = 'best_trash_type_model.keras'
model = tf.keras.models.load_model(MODEL_PATH)

CLASS_LABELS = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']
@app.route('/chatbot', methods=['POST'])
def chatbot_route():
    user_input = request.json.get('message', '').strip()

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    chat = client.chats.create(model="gemini-2.5-flash")

    prompt = (
        f"You are a sustainability expert. Respond briefly and simply (around 3-5 sentences) "
        f"to this user's question: {user_input}. "
        "Avoid using Markdown, bullet points, or asterisks. "
        "Give concise, practical suggestions related to reuse, repair, recycling, or upcycling."
    )

    response = chat.send_message(prompt)
    text = response.text.strip()

    cleaned_text = re.sub(r'[*_#`>]', '', text)

    return jsonify({"bot_response": cleaned_text})

@app.route('/image-detection', methods=['POST'])
def image_detection():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']

    if image_file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    try:
        img_bytes = image_file.read()
        img = image.load_img(io.BytesIO(img_bytes), target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        predictions = model.predict(img_array)
        predicted_index = np.argmax(predictions, axis=1)[0]
        predicted_label = CLASS_LABELS[predicted_index]
        confidence = float(np.max(predictions))

        return jsonify({
            "detected_class": predicted_label,
            "confidence": round(confidence * 100, 2)
        })
    except Exception as e:
        return jsonify({"error": f"Failed to process image: {str(e)}"}), 500
if __name__ == "__main__":
    app.run(debug=True)
