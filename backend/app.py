import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from cozepy import Coze, TokenAuth, Message, ChatEventType, COZE_CN_BASE_URL

app = Flask(__name__)
CORS(app) # 启用CORS，允许前端访问

# 直接使用提供的API令牌和机器人ID
# 建议将这些敏感信息通过环境变量管理
coze_api_token = os.environ.get('COZE_API_TOKEN', 'pat_EzTP3vfCz9cEyAnIoeWz7mhdMEYSk9pPV2BuuFcM7nKYA5Xtnw46Rp0RwFgF2KBk')
coze_bot_id = os.environ.get('COZE_BOT_ID', "7512293801969500194")

print(f"Using COZE_API_TOKEN: {coze_api_token}")
print(f"Using COZE_BOT_ID: {coze_bot_id}")

# 初始化Coze客户端
coze = Coze(auth=TokenAuth(coze_api_token), base_url=COZE_CN_BASE_URL)

# 用于存储每个用户的对话历史
# 注意：在生产环境中，这应该是一个持久化的存储，例如数据库或缓存
user_conversations = {}

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_id = data.get('user_id', 'default_user_id')
    user_input = data.get('message')

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    # 获取或初始化用户的对话历史
    if user_id not in user_conversations:
        user_conversations[user_id] = []

    # 将用户消息添加到对话历史
    user_conversations[user_id].append(Message.build_user_question_text(user_input))

    full_bot_response = ""
    try:
        for event in coze.chat.stream(
                bot_id=coze_bot_id,
                user_id=user_id,
                additional_messages=user_conversations[user_id]
        ):
            if event.event == ChatEventType.CONVERSATION_MESSAGE_DELTA:
                full_bot_response += event.message.content
            elif event.event == ChatEventType.CONVERSATION_CHAT_COMPLETED:
                # 聊天完成事件，不需要额外处理，累积的回复已在full_bot_response中
                pass
    except Exception as e:
        print(f"Coze API error: {e}")
        return jsonify({"error": "Coze API error", "details": str(e)}), 500

    return jsonify({"response": full_bot_response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
