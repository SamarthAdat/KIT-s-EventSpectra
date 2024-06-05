from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.agents.agent_types import AgentType
from langchain_experimental.agents.agent_toolkits import create_csv_agent
from langchain_openai import ChatOpenAI, OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/process_question', methods=['POST'])
def process_question():
    try:
        openai_api_key = os.getenv('OPENAI_API_KEY')

        user_question = request.form.get('question')
        category = request.form.get('category')

        if category is None:
            return jsonify({'error': 'No category provided'})

        file_name = f"MegaProject.{category.lower()}.csv"
        file_path = os.path.join("D:/EventSpectra/Server", file_name)

        if not os.path.exists(file_path):
            return jsonify({'error': 'CSV file not found'})

        agent = create_csv_agent(
            ChatOpenAI(temperature=0, model="gpt-3.5-turbo-0613", openai_api_key=openai_api_key),
            file_path,
            verbose=True,
            agent_type=AgentType.OPENAI_FUNCTIONS,
        )

        if user_question:
            response = agent.run(user_question)
            # Check if the response indicates no relevant data found
            if not response or "I don't have any information on that" in response:
                return jsonify({'response': 'Data not found!'})
            return jsonify({'response': response})
        else:
            return jsonify({'error': 'Invalid question'})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5002)
