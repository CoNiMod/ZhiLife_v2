import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Space, Typography } from 'antd'; // 移除Card
import { SendOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const WordChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = { type: 'user', content: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: 'react_user', message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse: Message = { type: 'bot', content: data.response };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { type: 'bot', content: "抱歉，聊天服务出现问题。" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: '#f5f5f5', // 更浅的背景色
          borderRadius: '8px',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '8px', // 减小间距
            }}
          >
            <div
              style={{
                maxWidth: '75%', // 稍微增大最大宽度
                padding: '10px 14px', // 调整内边距
                borderRadius: '18px',
                backgroundColor: msg.type === 'user' ? '#1890ff' : '#ffffff', // 用户消息蓝色，机器人消息白色
                color: msg.type === 'user' ? '#fff' : '#333',
                wordBreak: 'break-word',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // 添加阴影
              }}
            >
              <Text style={{ color: 'inherit' }}>{msg.content}</Text>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onPressEnter={sendMessage}
          placeholder="输入你的消息..."
          disabled={loading}
          size="large"
          style={{ borderRadius: '20px 0 0 20px' }} // 圆角
        />
        <Button
          type="primary"
          onClick={sendMessage}
          loading={loading}
          icon={<SendOutlined />}
          size="large"
          style={{ borderRadius: '0 20px 20px 0' }} // 圆角
        >
          发送
        </Button>
      </Space.Compact>
    </div>
  );
};

export default WordChat;
