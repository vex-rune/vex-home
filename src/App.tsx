import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { ParticleBackgroundComponent } from './components/ParticleBackground';
import { MouseFollower } from './components/MouseFollower';
import { SectionTitle } from './components/SectionTitle';
import { TechStack } from './components/TechStack';
import { ProjectCard } from './components/ProjectCard';
import { WikiItem, wikiItems } from './components/WikiItem';

const breatheAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background: #08080c;
  color: #f0f0f0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
`;

const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(165, 180, 252, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
  animation: ${breatheAnimation} 8s ease-in-out infinite;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Section = styled(motion.section)`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  box-sizing: border-box;
`;

const GlowOrb = styled(motion.div)<{ $size?: string; $color?: string; $top?: string; $left?: string; $right?: string; $bottom?: string }>`
  position: fixed;
  width: ${props => props.$size || '300px'};
  height: ${props => props.$size || '300px'};
  background: radial-gradient(circle, ${props => props.$color || 'rgba(165, 180, 252, 0.3)'} 0%, transparent 70%);
  border-radius: 50%;
  top: ${props => props.$top || 'auto'};
  left: ${props => props.$left || 'auto'};
  right: ${props => props.$right || 'auto'};
  bottom: ${props => props.$bottom || 'auto'};
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const AboutSection = styled(Section)`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%);
  padding: 100px 20px;
`;

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  max-width: 1200px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const AboutText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 2;
  color: rgba(240, 240, 240, 0.85);
  margin-bottom: 40px;
`;

const ProjectsSection = styled(Section)`
  flex-direction: column;
  align-items: center;
  padding: 100px 20px;
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%);
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  width: 100%;
`;

const WikiSection = styled(Section)`
  flex-direction: column;
  align-items: center;
  padding: 100px 20px;
`;

const WikiList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 800px;
  width: 100%;
`;

const Footer = styled(motion.footer)`
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.02);
  color: rgba(240, 240, 240, 0.6);
  font-size: 0.9rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #a5b4fc, transparent);
  }
`;

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const
    }
  }
};

const projects = [
  {
    title: '个人 Wiki 知识库',
    description: '基于现代化知识管理系统的个人Wiki平台，支持标签分类、搜索和快速访问。使用前沿技术栈构建，提供流畅的用户体验。',
    tags: ['React', '向量检索', '知识图谱']
  },
  {
    title: 'AI Agent 智能体',
    description: '自主决策的AI Agent系统，能够理解复杂指令、执行多步骤任务、调用工具和API，实现自动化工作流程。',
    tags: ['LLM', 'Agent', '工具调用']
  },
  {
    title: '自动化脚本工具集',
    description: '一站式自动化解决方案集合，包括数据处理、文件管理、系统监控等实用脚本，提升日常工作效率。',
    tags: ['Python', '自动化', '效率工具']
  }
];

export default function App() {
  return (
    <Container>
      <AnimatedBackground />
      <MouseFollower />
      
      <GlowOrb
        $size="400px"
        $color="rgba(99, 102, 241, 0.3)"
        $top="10%"
        $left="10%"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <GlowOrb
        $size="300px"
        $color="rgba(165, 180, 252, 0.2)"
        $bottom="20%"
        $right="15%"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
      
      <ParticleBackgroundComponent />
      
      <Content>
        <Section
          initial="hidden"
          animate="visible"
        >
          <SectionContent>
            <Header />
          </SectionContent>
        </Section>

        <AboutSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <AboutContainer>
            <SectionTitle align="left">关于我</SectionTitle>
            <div>
              <AboutText variants={fadeInUp}>
                高级后端开发工程师，拥有十余年 IT 行业从业经验。主攻 Java 技术生态，擅长企业级应用开发与微服务架构。
                从传统电气工程领域成功转型，这段经历塑造了独特的技术视角：注重系统稳定性与可靠性的底层意识。
                持续深耕后端开发，掌握从数据库到微服务的完整技术链条。紧跟技术趋势，探索 AI 工程化领域，跟上大模型时代步伐。
              </AboutText>
              <TechStack />
            </div>
          </AboutContainer>
        </AboutSection>

        <ProjectsSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <SectionTitle align="left">精选作品</SectionTitle>
          <ProjectsGrid variants={fadeInUp}>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
              />
            ))}
          </ProjectsGrid>
        </ProjectsSection>

        <WikiSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <SectionTitle align="left">Wiki 知识库</SectionTitle>
          <WikiList variants={fadeInUp}>
            {wikiItems.map((item, index) => (
              <WikiItem
                key={index}
                href={item.href}
                icon={item.icon}
                label={item.label}
                external={item.external}
              />
            ))}
          </WikiList>
        </WikiSection>

        <Footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>© 2024 REXRUNE. Built with React & TypeScript.</p>
        </Footer>
      </Content>
    </Container>
  );
}