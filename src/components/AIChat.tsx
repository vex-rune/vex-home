import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 380px;
  max-height: 500px;
  background: rgba(8, 8, 12, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(165, 180, 252, 0.15);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ChatHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(165, 180, 252, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #f0f0f0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  span {
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(240, 240, 240, 0.5);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  
  &:hover {
    color: #f0f0f0;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(165, 180, 252, 0.3);
    border-radius: 2px;
  }
`;

const MessageBubble = styled(motion.div)<{ $isUser?: boolean }>`
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 0.9rem;
  line-height: 1.5;
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.$isUser ? 'rgba(99, 102, 241, 0.3)' : 'rgba(165, 180, 252, 0.1)'};
  color: #f0f0f0;
  border: 1px solid ${props => props.$isUser ? 'rgba(99, 102, 241, 0.3)' : 'rgba(165, 180, 252, 0.1)'};
`;

const InputContainer = styled.div`
  padding: 12px 16px;
  border-top: 1px solid rgba(165, 180, 252, 0.1);
  display: flex;
  gap: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(165, 180, 252, 0.15);
  border-radius: 24px;
  padding: 10px 16px;
  color: #f0f0f0;
  font-size: 0.9rem;
  outline: none;
  
  &:focus {
    border-color: rgba(165, 180, 252, 0.4);
  }
  
  &::placeholder {
    color: rgba(240, 240, 240, 0.4);
  }
`;

const SendButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1, #a5b4fc);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChatToggleButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #6366f1, #a5b4fc);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
  z-index: 999;
`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const API_URL = 'http://8.160.183.109:9100/v1/chat/completions';

const STORAGE_KEY = 'chat_history';

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*'
        },
        body: JSON.stringify({
          model: 'abab5.5-chat',
          messages: [...messages, userMessage]
        })
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`);
      }
      
      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || '抱歉，我无法回答这个问题。'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMsg = error.name === 'AbortError' 
        ? '请求超时，请检查网络后重试' 
        : `连接服务器失败: ${error.message}，请稍后重试`;
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMsg
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <ChatToggleButton
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="打开AI对话"
        >
          ?
        </ChatToggleButton>
      )}
      
      {isOpen && (
          <ChatContainer
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <ChatHeader>
              <h3><span />AI 对话</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={clearHistory}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'rgba(240,240,240,0.5)', 
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  清除
                </button>
                <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
              </div>
            </ChatHeader>
            
            <MessagesContainer>
              {messages.length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  color: 'rgba(240,240,240,0.4)',
                  padding: '20px 0',
                  fontSize: '0.85rem'
                }}>
                  发送消息开始对话
                </div>
              )}
              {messages.map((msg, i) => (
                <MessageBubble
                  key={i}
                  $isUser={msg.role === 'user'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg.content}
                </MessageBubble>
              ))}
              {isLoading && (
                <MessageBubble
                  $isUser={false}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  思考中...
                </MessageBubble>
              )}
              <div ref={messagesEndRef} />
            </MessagesContainer>
            
            <InputContainer>
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="发送消息..."
                disabled={isLoading}
              />
              <SendButton
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ➤
              </SendButton>
            </InputContainer>
          </ChatContainer>
        )}
    </>
  );
}