import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

/** 用户未手动选择时，跟随系统偏好；手动选择后锁定用户设置 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  // 仅在用户未手动设置时，监听系统偏好变化并自动跟随
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 同步 DOM 和 localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggle };
}
