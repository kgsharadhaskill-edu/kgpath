// src/components/layout/GooeyNav.tsx

import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

// (Interfaces and component definition remain the same)
interface NavItem { label: string; href: string; }
interface GooeyNavProps { items: NavItem[]; animationTime?: number; particleCount?: number; particleDistances?: number[]; particleR?: number; timeVariance?: number; colors?: number[]; }

const GooeyNav = ({ items, animationTime = 600, particleCount = 15, particleDistances = [90, 10], particleR = 100, timeVariance = 300, colors = [1, 2, 3, 1, 2, 3, 1, 4], }: GooeyNavProps) => {
  // (All the hooks and functions remain exactly the same)
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [location] = useLocation();
  const isActive = (href: string) => href === '/' ? location === '/' : location.startsWith(href);
  const activeIndex = items.findIndex(item => isActive(item.href));
  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance: number, pointIndex: number, totalPoints: number) => { const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180); return [distance * Math.cos(angle), distance * Math.sin(angle)]; };
  const createParticle = (i: number, t: number, d: number[], r: number) => { let rotate = noise(r / 10); return { start: getXY(d[0], particleCount - i, particleCount), end: getXY(d[1] + noise(7), particleCount - i, particleCount), time: t, scale: 1 + noise(0.2), color: colors[Math.floor(Math.random() * colors.length)], rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10 }; };
  const makeParticles = (element: HTMLSpanElement) => { const d = particleDistances; const r = particleR; const bubbleTime = animationTime * 2 + timeVariance; element.style.setProperty('--time', `${bubbleTime}ms`); for (let i = 0; i < particleCount; i++) { const t = animationTime * 2 + noise(timeVariance * 2); const p = createParticle(i, t, d, r); element.classList.remove('active'); setTimeout(() => { const particle = document.createElement('span'); const point = document.createElement('span'); particle.classList.add('particle'); particle.style.setProperty('--start-x', `${p.start[0]}px`); particle.style.setProperty('--start-y', `${p.start[1]}px`); particle.style.setProperty('--end-x', `${p.end[0]}px`); particle.style.setProperty('--end-y', `${p.end[1]}px`); particle.style.setProperty('--time', `${p.time}ms`); particle.style.setProperty('--scale', `${p.scale}`); particle.style.setProperty('--color', `var(--color-${p.color}, hsl(var(--primary)))`); particle.style.setProperty('--rotate', `${p.rotate}deg`); point.classList.add('point'); particle.appendChild(point); element.appendChild(particle); requestAnimationFrame(() => { element.classList.add('active'); }); setTimeout(() => { try { element.removeChild(particle); } catch { /* do nothing */ } }, t); }, 30); } };
  const updateEffectPosition = (element: HTMLLIElement) => { if (!containerRef.current || !filterRef.current || !textRef.current) return; const containerRect = containerRef.current.getBoundingClientRect(); const pos = element.getBoundingClientRect(); const styles = { left: `${pos.x - containerRect.x}px`, top: `${pos.y - containerRect.y}px`, width: `${pos.width}px`, height: `${pos.height}px` }; Object.assign(filterRef.current.style, styles); Object.assign(textRef.current.style, styles); textRef.current.innerText = element.innerText; };
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => { const liEl = e.currentTarget.parentElement as HTMLLIElement; if (!liEl) return; updateEffectPosition(liEl); if (filterRef.current) { const particles = filterRef.current.querySelectorAll('.particle'); particles.forEach(p => filterRef.current!.removeChild(p)); } if (textRef.current) { textRef.current.classList.remove('active'); void textRef.current.offsetWidth; textRef.current.classList.add('active'); } if (filterRef.current) { makeParticles(filterRef.current); } };
  useEffect(() => { if (!navRef.current || !containerRef.current || activeIndex === -1) return; const activeLi = navRef.current.querySelectorAll('li')[activeIndex]; if (activeLi) { updateEffectPosition(activeLi); textRef.current?.classList.add('active'); } const resizeObserver = new ResizeObserver(() => { const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex]; if (currentActiveLi) { updateEffectPosition(currentActiveLi); } }); resizeObserver.observe(containerRef.current); return () => resizeObserver.disconnect(); }, [activeIndex, items, location]);

  return (
    <>
      <style>
        {`
          :root {
            --color-1: #4F46E5; --color-2: #EC4899; --color-3: #F59E0B; --color-4: #10B981;
          }
          .gooey-nav-container .effect {
            position: absolute; opacity: 1; pointer-events: none; display: grid; place-items: center; z-index: 1;
          }
          .gooey-nav-container .effect.text {
            color: hsl(var(--primary-foreground)); transition: color 0.3s ease;
          }
          .gooey-nav-container .effect.filter {
            /* === THIS IS THE FIX: blur() is removed to eliminate the shadow === */
            filter: contrast(100); 
            mix-blend-mode: multiply;
          }
          .gooey-nav-container .effect.filter::before {
            content: ""; position: absolute; inset: -75px; z-index: -2;
            background: transparent;
          }
          .gooey-nav-container .effect.filter::after {
            content: ""; position: absolute; inset: 0; background: hsl(var(--primary)); transform: scale(0); opacity: 0; z-index: -1; border-radius: 9999px;
          }
          .gooey-nav-container .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill { to { transform: scale(1); opacity: 1; } }
          /* ... Rest of the styles are unchanged ... */
          .gooey-nav-container .particle, .gooey-nav-container .point { display: block; opacity: 0; width: 20px; height: 20px; border-radius: 9999px; transform-origin: center; }
          .gooey-nav-container .particle { --time: 5s; position: absolute; top: calc(50% - 8px); left: calc(50% - 8px); animation: particle calc(var(--time)) ease 1 -350ms; }
          .gooey-nav-container .point { background: var(--color); opacity: 1; animation: point calc(var(--time)) ease 1 -350ms; }
          @keyframes particle { 0% { transform: rotate(0deg) translate(var(--start-x), var(--start-y)); opacity: 1; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); } 70% { transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2)); opacity: 1; animation-timing-function: ease; } 85% { transform: rotate(calc(var(--rotate) * 0.66)) translate(var(--end-x), var(--end-y)); opacity: 1; } 100% { transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)); opacity: 1; } }
          @keyframes point { 0% { transform: scale(0); opacity: 0; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); } 25% { transform: scale(calc(var(--scale) * 0.25)); } 38% { opacity: 1; } 65% { transform: scale(var(--scale)); opacity: 1; animation-timing-function: ease; } 85% { transform: scale(var(--scale)); opacity: 1; } 100% { transform: scale(0); opacity: 0; } }
          .gooey-nav-container li.active { color: hsl(var(--primary-foreground)); text-shadow: none; }
          .gooey-nav-container li.active::after { opacity: 1; transform: scale(1); }
          .gooey-nav-container li::after { content: ""; position: absolute; inset: 0; border-radius: 8px; background: hsl(var(--primary)); opacity: 0; transform: scale(0); transition: all 0.3s ease; z-index: -1; }
        `}
      </style>
      <div className="relative gooey-nav-container" ref={containerRef}>
        <nav className="flex relative" style={{ transform: 'translate3d(0,0,0.01px)' }}>
          <ul ref={navRef} className="flex gap-2 list-none p-0 px-2 m-0 relative z-[3]" style={{ color: 'hsl(var(--foreground) / 0.7)' }} >
            {items.map((item, index) => (
              <li key={index} className={`rounded-lg relative cursor-pointer transition-[color] duration-300 ease ${activeIndex === index ? 'active' : ''}`} >
                <Link href={item.href}>
                  <a onClick={handleClick} className="outline-none py-[0.6em] px-[1em] inline-block font-medium">
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyNav;