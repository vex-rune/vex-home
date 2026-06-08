import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const Page = styled.div`
  min-height: 100vh;
  background: #f8f5f0;
  color: #000;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow-x: clip;
  overflow-y: clip;
`;

const Content = styled(motion.main)`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;


const BorderedCard = styled.section`
  border: 1px solid #000;
  background: #f8f5f0;
  margin-bottom: 24px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  &:hover {
    background: #000;
    color: #fff;
    * { color: #fff; border-color: #333; }
  }
`;

const CardHeader = styled.div`
  padding: 48px 48px 0;
`;

const CardTitle = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  color: #000;
  margin-bottom: 12px;
`;

const CardSubtitle = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: #555;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const CardBody = styled.div`
  padding: 0 48px 48px;
`;

const SectionBlock = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #000;
  &:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
`;

const SectionLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 12px;
`;

const SectionText = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: #333;
  line-height: 2;
  margin-bottom: 8px;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  padding: 4px 12px;
  border: 1px solid #000;
  font-size: 0.8rem;
  font-weight: 400;
  color: #333;
`;

// ── Data ──
interface AboutSection {
  label: string;
  content: string[];
  tags?: string[];
}

interface AboutPage {
  title: string;
  subtitle: string;
  sections: AboutSection[];
}

export const aboutData: Record<string, AboutPage> = {
  skills: {
    title: '后端开发',
    subtitle: 'Java | 微服务 | 云原生',
    sections: [
      {
        label: '做过什么',
        content: [
          '平台后端架构设计，DDD 业务域拆分，十几个微服务',
          'AWS 多区域部署，容器化，Datadog 全链路监控',
          '合同、订单、运输流程线上化，对接电子签章',
        ],
        tags: ['Java', 'Spring Boot', 'DDD', 'MySQL', 'Redis', 'Docker', 'AWS'],
      },
      {
        label: '还在做什么',
        content: [
          'Java 后端底层、云原生、DevOps',
          'Milvus 向量数据库、HNSW/IVF 索引算法',
        ],
      },
      {
        label: '以后想做',
        content: [
          '工程化升级、AI Agent 高阶',
          '智能体编排、多语言语义检索',
          'IoT 设备通信层封装、Flutter 跨平台、TTS 语音交互'
        ],
      },
    ],
  },
  ai: {
    title: 'AI 工程化探索',
    subtitle: 'Spring AI | RAG | AI Agent | Function Calling',
    sections: [
      {
        label: '做过什么',
        content: [
          'AI Agent、RAG 知识库、Spring AI、Function Calling',
          'AI 剧本生成、多语言翻译、Token 计费优化',
        ],
        tags: ['Spring AI', 'RAG', 'AI Agent', 'Function Calling', 'Milvus'],
      },
      {
        label: '还在做什么',
        content: [
          'Java 任务编排器、会话管理、计费限流',
          'Milvus 向量数据库、多语言语义检索',
        ],
      },
      {
        label: '以后想做',
        content: [
          'IoT 设备通信层封装、Flutter 跨平台、TTS 语音交互',
          '多板级联通信、ESP32 轻量 AI 模型',
        ],
      },
    ],
  },
  transition: {
    title: '电气工程转型',
    subtitle: '工业自动化 → 互联网后端',
    sections: [
      {
        label: '做过什么',
        content: [
          '10+ 大型换热站自动化控制项目',
          'PLC 程序、上位机监控、电气柜设计调试',
        ],
        tags: ['PLC', 'MQTT', 'EMQX', 'ESP32'],
      },
      {
        label: '还在做什么',
        content: [
          '8 年 Java 后端 + 5 年工业自动化',
          '硬件工程逻辑 + 互联网高并发架构',
        ],
      },
      {
        label: '以后想做',
        content: [
          '硬件 DIY、CAD/SketchUp 建模',
          'AI 绘画、视频、提示词工程',
        ],
      },
    ],
  },
  '3dprint': {
    title: '3D 打印',
    subtitle: '拓竹 A1 | Autodesk Fusion',
    sections: [
      {
        label: '做过什么',
        content: [
          'ESP32 外壳和支架',
          '生活杂货：手机支架、桌面收纳、钥匙扣',
          '其他定制打印项目: 蛋糕摆盘...',
        ],
        tags: ['拓竹 A1', 'Autodesk Fusion', 'FDM', 'Blender'],
      },
      {
        label: '还在做什么',
        content: [
          '拓竹 A1 打印，Autodesk Fusion 建模',
        ],
      },
      {
        label: '以后想做',
        content: [
          '后处理工艺：打磨、上色、喷涂',
          'AI 辅助生成三维模型',
          'IoT 项目外壳打印',
        ],
      },
    ],
  },
  iot: {
    title: 'ESP32 IoT 探索',
    subtitle: 'ESP32 | MQTT | 想搞点东西',
    sections: [
      {
        label: '做过什么',
        content: [
          'ESP32 开发板，PlatformIO + VS Code，C/C++',
        ],
        tags: ['ESP32', 'PlatformIO', 'MQTT', 'C/C++'],
      },
      {
        label: '还在做什么',
        content: [
          'MQTT 消息通信',
          '传感器采集：温湿度、光照',
        ],
      },
      {
        label: '以后想做',
        content: [
          'Flutter App 遥控器',
          'TTS 语音交互',
          '多板级联通信',
          'ESP32 轻量 AI 模型',
          'MQTT / BLE / Zigbee 多协议混搭',
        ],
      },
    ],
  },
};

export default function About() {
  const [activeId, setActiveId] = useState<string>(() => window.location.hash.slice(1) || 'skills');

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && aboutData[hash]) setActiveId(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (activeId) {
      const el = document.getElementById(activeId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeId]);

  const navigateTo = (id: string) => {
    window.location.hash = id;
    setActiveId(id);
  };

  // Build ordered list of all about IDs
  const allIds = Object.keys(aboutData);

  return (
    <Page>
      <Content initial="hidden" animate="visible" variants={stagger}>
        {allIds.map((id) => {
          const data = aboutData[id];
          if (!data) return null;
          return (
            <React.Fragment key={id}>
              <div id={id} style={{ position: 'relative', top: -100 }} />
              <BorderedCard style={{ marginBottom: 24 }}>
                <CardHeader>
                  <motion.div variants={fadeInUp}>
                    <CardTitle style={{ cursor: 'pointer' }} onClick={() => navigateTo(id)}>
                      {data.title}
                    </CardTitle>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <CardSubtitle>{data.subtitle}</CardSubtitle>
                  </motion.div>
                </CardHeader>
                <CardBody>
                  {data.sections.map((section) => (
                    <motion.div key={section.label} variants={fadeInUp}>
                      <SectionBlock>
                        <SectionLabel>{section.label}</SectionLabel>
                        {section.tags && (
                          <TagRow>
                            {section.tags.map((tag) => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </TagRow>
                        )}
                        {section.content?.map((text, i) => (
                          <SectionText key={i}>{text}</SectionText>
                        ))}
                      </SectionBlock>
                    </motion.div>
                  ))}
                </CardBody>
              </BorderedCard>
            </React.Fragment>
          );
        })}
      </Content>
    </Page>
  );
}
