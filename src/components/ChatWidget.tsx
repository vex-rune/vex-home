import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { buildSystemMessage } from '../config/roles';

/* ── Styled Components ── */
const ChatToggle = styled.button`
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 1000;
  width: 48px;
  height: 48px;
  background: #fff;
  border: 1px solid #111;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #111; color: #fff; }
`;

const ChatPanel = styled.div`
  position: fixed;
  bottom: 92px;
  left: 32px;
  z-index: 1000;
  width: 380px;
  height: 500px;
  background: #f8f5f0;
  border: 1px solid #111;
  display: flex;
  flex-direction: column;
`;

const ChatHeaderBar = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 700;
`;

const ChatClearBtn = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.75rem;
  &:hover { color: #111; }
`;

const ChatCloseBtn = styled.button`
  background: none;
  border: none;
  color: #111;
  cursor: pointer;
  font-size: 1rem;
  &:hover { color: #555; }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: #ccc; }
`;

const ChatMsg = styled.div<{ $isUser?: boolean }>`
  max-width: 80%;
  padding: 10px 14px;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #111;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  border: 1px solid #111;
  background: ${({ $isUser }) => ($isUser ? '#111' : 'transparent')};
  color: ${({ $isUser }) => ($isUser ? '#fff' : '#111')};
`;

const ChatInputRow = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #111;
  display: flex;
  gap: 8px;
`;

const ChatInputField = styled.input`
  flex: 1;
  background: transparent;
  border: 1px solid #111;
  padding: 8px 12px;
  font-size: 0.85rem;
  color: #111;
  outline: none;
  font-family: inherit;
  &::placeholder { color: #999; }
`;

const ChatSendBtn = styled.button`
  background: #111;
  border: 1px solid #111;
  color: #fff;
  padding: 8px 16px;
  font-size: 0.8rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #333; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const ChatEmpty = styled.div`
  text-align: center;
  color: #999;
  padding: 40px 0;
  font-size: 0.85rem;
`;

/* ── Component ── */
export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>(() => {
    try {
      const saved = localStorage.getItem('portal_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('portal_chat_history', JSON.stringify(chatMessages.slice(-100)));
  }, [chatMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: 'user' as const, content: chatInput.trim() };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);
    try {
      const res = await fetch('/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemMessage: buildSystemMessage(chatMessages.map(m => m.content).join('\n')),
          userMessage: userMsg.content,
        }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.text || '出错了' }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: '连接失败，请稍后再试' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <>
      {chatOpen && (
        <ChatPanel>
          <ChatHeaderBar>
            <span>AI 对话</span>
            <div style={{ display: 'flex', gap: 12 }}>
              <ChatClearBtn onClick={() => { setChatMessages([]); localStorage.removeItem('portal_chat_history'); }}>清除</ChatClearBtn>
              <ChatCloseBtn onClick={() => setChatOpen(false)}>×</ChatCloseBtn>
            </div>
          </ChatHeaderBar>
          <ChatMessages>
            {chatMessages.length === 0 && <ChatEmpty>发送消息开始对话</ChatEmpty>}
            {chatMessages.map((msg, i) => (
              <ChatMsg key={i} $isUser={msg.role === 'user'}>{msg.content}</ChatMsg>
            ))}
            {chatLoading && <ChatMsg>思考中...</ChatMsg>}
            <div ref={chatEndRef} />
          </ChatMessages>
          <ChatInputRow>
            <ChatInputField
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
              placeholder="输入消息..."
              disabled={chatLoading}
            />
            <ChatSendBtn onClick={sendChat} disabled={chatLoading || !chatInput.trim()}>发送</ChatSendBtn>
          </ChatInputRow>
        </ChatPanel>
      )}
      <ChatToggle onClick={() => setChatOpen(!chatOpen)}>
        嗨!
      </ChatToggle>
    </>
  );
}
