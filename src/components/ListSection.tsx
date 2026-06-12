import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

/* ── Styled Components ── */
const SectionTitle = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 700;
  padding: 32px 24px 16px;
  border-bottom: 1px solid var(--color-border);
`;

const ListRow = styled.a<{ as?: string }>`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  text-decoration: none;
  color: var(--color-text);
  background: transparent;
  border-bottom: 1px solid var(--color-border);
  transition: background 0.2s ease, color 0.2s ease;
  &:hover { background: var(--color-interactive); color: var(--color-text-inverse); }
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const ListNum = styled.span`
  font-size: 1rem;
  color: inherit;
  min-width: 36px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ListTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  flex: 1;
  color: inherit;
`;

const ListDesc = styled.span`
  font-size: 0.9rem;
  color: inherit;
  flex: 2;
  padding-left: 16px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ListArrow = styled(FaArrowRight)`
  color: inherit;
  font-size: 0.85rem;
  transition: transform 0.3s;
  ${ListRow}:hover & { transform: translateX(4px); }
`;

/* ── Types ── */
export interface ListItem {
  id?: string;
  num?: string;
  title: string;
  desc: string;
  href?: string;
  onClick?: () => void;
}

interface ListSectionProps {
  title: string;
  items: ListItem[];
  id?: string;
}

/* ── Component ── */
export default function ListSection({ title, items, id }: ListSectionProps) {
  return (
    <div id={id}>
      <SectionTitle>{title}</SectionTitle>
      {items.map((item, index) => (
        <ListRow
          key={item.id || item.title}
          href={item.href}
          target={item.href?.startsWith('http') ? '_blank' : undefined}
          rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          onClick={item.onClick}
          style={item.onClick ? { cursor: 'pointer' } : undefined}
        >
          <ListNum>{item.num || String(index + 1).padStart(2, '0')}</ListNum>
          <ListTitle>{item.title}</ListTitle>
          <ListDesc>{item.desc}</ListDesc>
          <ListArrow />
        </ListRow>
      ))}
    </div>
  );
}
