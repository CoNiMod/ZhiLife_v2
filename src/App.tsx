import React, { useRef, useState } from 'react';
import {
  EventNames,
  RealtimeAPIError,
  RealtimeClient,
  RealtimeError,
  RealtimeUtils,
} from '@coze/realtime-api';
import { Button, Space, List, message, Layout, Typography, Menu } from 'antd'; // 移除Tabs
import { CozeAPI, COZE_CN_BASE_URL, ChatEventType } from '@coze/api';
import { useTokenWithPat } from './hooks';
import WordChat from './components/WordChat'; // 导入WordChat组件
import './App.css'; // 导入App.css用于全局样式
import {
  MessageOutlined,
  AudioOutlined,
  SettingOutlined,
  HistoryOutlined,
} from '@ant-design/icons'; // 导入图标

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

// ⚠️ 替换成你的智能体ID
const botId = '7512023551361646626';

function App() {
  const clientRef = useRef<RealtimeClient | null>(null);
  // 实时语音回复消息列表
  const [messageList, setMessageList] = useState<string[]>([]);
  // 是否正在连接
  const [isConnecting, setIsConnecting] = useState(false);
  // 是否已连接
  const [isConnected, setIsConnected] = useState(false);
  // 是否开启麦克风
  const [audioEnabled, setAudioEnabled] = useState(true);
  // 是否支持视频
  const [isSupportVideo, setIsSupportVideo] = useState(false);
  // 当前选中的菜单项
  const [selectedKey, setSelectedKey] = useState('textChat');

  const { getToken } = useTokenWithPat();

  async function getVoices() {
    const api = new CozeAPI({
      token: getToken,
      baseURL: COZE_CN_BASE_URL,
      allowPersonalAccessTokenInBrowser: true,
    });

    const voices = await api.audio.voices.list();
    return voices.voice_list;
  }

  async function initClient() {
    const permission = await RealtimeUtils.checkDevicePermission(true);
    if (!permission.audio) {
      throw new Error('需要麦克风访问权限');
    }
    // 记录是否支持视频
    setIsSupportVideo(permission.video);

    // 获取可用音色列表(可选)
    const voices = await getVoices();

    const client = new RealtimeClient({
      accessToken: getToken,
      botId,
      connectorId: '1024',
      voiceId: voices.length > 0 ? voices[0].voice_id : undefined,
      allowPersonalAccessTokenInBrowser: true, // 可选：允许在浏览器中使用个人访问令牌
      debug: true,
      videoConfig: permission.video
        ? {
            renderDom: 'local-player',
          }
        : undefined,
    });

    clientRef.current = client;

    handleMessageEvent();
  }

  const handleMessageEvent = async () => {
    let lastEvent: any;

    clientRef.current?.on(EventNames.ALL_SERVER, (eventName, event: any) => {
      if (
        event.event_type !== ChatEventType.CONVERSATION_MESSAGE_DELTA &&
        event.event_type !== ChatEventType.CONVERSATION_MESSAGE_COMPLETED
      ) {
        return;
      }
      const content = event.data.content;
      setMessageList(prev => {
        // 如果上一个事件是增量更新，则附加到最后一条消息
        if (
          lastEvent?.event_type === ChatEventType.CONVERSATION_MESSAGE_DELTA
        ) {
          return [...prev.slice(0, -1), prev[prev.length - 1] + content];
        }
        // 否则添加新消息
        if (event.event_type === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
          return [...prev, content];
        }
        return prev;
      });
      lastEvent = event;
    });
  };

  const handleConnect = async () => {
    try {
      if (!clientRef.current) {
        await initClient();
      }
      await clientRef.current?.connect();
      setIsConnected(true);
    } catch (error) {
      console.error(error);
      if (error instanceof RealtimeAPIError) {
        switch (error.code) {
          case RealtimeError.CREATE_ROOM_ERROR:
            message.error(`创建房间失败: ${error.message}`);
            break;
          case RealtimeError.CONNECTION_ERROR:
            message.error(`加入房间失败: ${error.message}`);
            break;
          case RealtimeError.DEVICE_ACCESS_ERROR:
            message.error(`获取设备失败: ${error.message}`);
            break;
          default:
            message.error(`连接错误: ${error.message}`);
        }
      } else {
        message.error('连接错误：' + error);
      }
    }
  };

  const handleInterrupt = () => {
    try {
      clientRef.current?.interrupt();
    } catch (error) {
      message.error('打断失败：' + error);
    }
  };

  const handleDisconnect = () => {
    try {
      clientRef.current?.disconnect();
      clientRef.current?.clearEventHandlers();
      clientRef.current = null;
      setIsConnected(false);
    } catch (error) {
      message.error('断开失败：' + error);
    }
  };

  const toggleMicrophone = async () => {
    try {
      await clientRef.current?.setAudioEnable(!audioEnabled);
      setAudioEnabled(!audioEnabled);
    } catch (error) {
      message.error('切换麦克风状态失败：' + error);
    }
  };

  const menuItems = [
    {
      key: 'textChat',
      icon: <MessageOutlined />,
      label: '文字聊天',
    },
    {
      key: 'voiceChat',
      icon: <AudioOutlined />,
      label: '语音聊天',
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: '历史记录',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case 'textChat':
        return <WordChat />;
      case 'voiceChat':
        return (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Space style={{ marginBottom: '20px' }}>
              <Button
                type={!isConnected && !isConnecting ? 'primary' : 'default'}
                disabled={isConnected || isConnecting}
                onClick={() => {
                  setIsConnecting(true);
                  handleConnect().finally(() => {
                    setIsConnecting(false);
                  });
                }}
              >
                连接
              </Button>
              <Button danger disabled={!isConnected} onClick={handleInterrupt}>
                打断
              </Button>
              <Button danger disabled={!isConnected} onClick={handleDisconnect}>
                断开
              </Button>
              {audioEnabled ? (
                <Button disabled={!isConnected} onClick={toggleMicrophone}>
                  静音
                </Button>
              ) : (
                <Button disabled={!isConnected} onClick={toggleMicrophone}>
                  取消静音
                </Button>
              )}
            </Space>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '800px' }}>
              {isSupportVideo && (
                <div
                  id="local-player"
                  style={{
                    width: '100%',
                    height: '400px',
                    border: '1px solid #d9d9d9',
                    backgroundColor: '#000',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                ></div>
              )}
              <div
                style={{
                  padding: '20px',
                  maxHeight: '600px',
                  overflowY: 'auto',
                  border: '1px solid #d9d9d9',
                  backgroundColor: '#f6f6f6',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Title level={4} style={{ marginTop: 0, marginBottom: '15px' }}>实时语音回复</Title>
                <List
                  dataSource={messageList}
                  renderItem={(message, index) => (
                    <List.Item key={index} style={{ textAlign: 'left', wordBreak: 'break-word' }}>
                      {message}
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        );
      case 'history':
        return <div style={{ padding: '20px', textAlign: 'center' }}>历史记录页面 (待开发)</div>;
      case 'settings':
        return <div style={{ padding: '20px', textAlign: 'center' }}>设置页面 (待开发)</div>;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#001529' }}>
        <div className="logo" style={{ height: '64px', background: 'rgba(255, 255, 255, 0.2)', margin: '16px' }}>
          <Title level={3} style={{ color: '#fff', lineHeight: '32px', margin: '16px 0 0 0' }}>
            ZhiLife
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['textChat']}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, borderBottom: '1px solid #f0f0f0' }}>
          <Title level={3} style={{ margin: 0, lineHeight: '64px', paddingLeft: '24px' }}>
            {menuItems.find(item => item.key === selectedKey)?.label}
          </Title>
        </Header>
        <Content style={{ margin: '24px 16px', overflow: 'auto' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 'calc(100vh - 112px - 48px)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', color: '#888' }}>
          ZhiLife ©2025 Created by Cline
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
