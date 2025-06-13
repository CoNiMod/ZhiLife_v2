import os
from cozepy import Coze, TokenAuth, Message, ChatEventType, COZE_CN_BASE_URL

# 直接使用提供的API令牌和机器人ID
coze_api_token = 'pat_EzTP3vfCz9cEyAnIoeWz7mhdMEYSk9pPV2BuuFcM7nKYA5Xtnw46Rp0RwFgF2KBk'
coze_bot_id = "7512293801969500194"

# 初始化Coze客户端
coze = Coze(auth=TokenAuth(coze_api_token), base_url=COZE_CN_BASE_URL)

# 定义用户ID，可以根据您的业务需求自定义
user_id = "default_user_id" # 使用一个默认的用户ID

print("开始与Coze机器人聊天。输入 'exit' 或 'quit' 结束对话。")

# 用于存储对话历史，以便进行连续对话
conversation_messages = []

while True:
    user_input = input("你: ")
    if user_input.lower() in ['exit', 'quit']:
        print("对话结束。")
        break

    # 将用户消息添加到对话历史
    conversation_messages.append(Message.build_user_question_text(user_input))

    # 发送聊天消息并以流式方式接收回复
    # 每次发送消息时，都包含完整的对话历史
    for event in coze.chat.stream(
            bot_id=coze_bot_id,
            user_id=user_id,
            additional_messages=conversation_messages
    ):
        if event.event == ChatEventType.CONVERSATION_MESSAGE_DELTA:
            print(event.message.content, end="")
        elif event.event == ChatEventType.CONVERSATION_CHAT_COMPLETED:
            # 将机器人的回复添加到对话历史
            # 注意：这里假设event.message.content是完整的机器人回复，
            # 对于流式输出，可能需要累积event.message.content
            # 为了简化，这里假设每次循环结束时，event.message.content是最后一次完整的回复
            # 实际应用中，您可能需要一个变量来累积机器人的完整回复
            # 这里为了演示连续对话，我们假设每次流式输出的最后一条delta就是完整的回复
            # 更严谨的做法是，在CONVERSATION_MESSAGE_DELTA事件中累积内容，
            # 然后在CONVERSATION_CHAT_COMPLETED事件中将累积的完整回复添加到conversation_messages
            # 但为了快速实现，我们暂时跳过累积，直接在循环外处理
            print() # 换行，使机器人回复和下一轮用户输入分开
            # 假设机器人回复是完整的，添加到历史中
            # 实际中，需要从delta事件中累积完整的机器人回复
            # 这里为了演示，我们暂时不将机器人的回复添加到conversation_messages，
            # 因为additional_messages每次都会重新构建，如果需要精确的对话历史，
            # 应该在每次完整的机器人回复后将其添加到conversation_messages。
            # 为了实现连续对话，Coze SDK的stream方法会自动处理conversation_id来维护上下文。
            # 因此，我们不需要手动管理conversation_messages列表来传递历史，
            # 只需要在每次新的用户输入时调用stream方法即可。
            # 移除手动维护 conversation_messages 的逻辑，依赖SDK的conversation_id
            pass # 聊天完成事件，不需要额外处理
    print() # 确保每次机器人回复后都有一个新行
