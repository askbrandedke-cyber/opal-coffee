"use client";

import Link from "next/link";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { IconArrowRight } from "@/components/brand/Icons";

type Variant = "primary" | "ghost-light" | "dark" | "ghost-dark";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  magnetic?: boolean;
  external?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
};

/** Link-styled button. External links open in a new tab with rel=noopener. */
export function ButtonLink({ href, children, variant = "primary", arrow = false, icon, className = "", magnetic = true, external, ariaLabel, onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

  // Subtle magnetic pull on fine pointers only.
  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!magnetic || e.pointerType !== "mouse" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.28;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };

  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <IconArrowRight className="btn-arrow" width={16} height={16} />}
    </>
  );

  if (isExternal) {
    return (
      <a ref={ref} href={href} className={cls} onPointerMove={onMove} onPointerLeave={onLeave} aria-label={ariaLabel} onClick={onClick}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} className={cls} onPointerMove={onMove} onPointerLeave={onLeave} aria-label={ariaLabel} onClick={onClick}>
      {inner}
    </Link>
  );
}
