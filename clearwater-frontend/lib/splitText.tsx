/**
 * splitText — Utility for Apple-grade character and word-level text reveals.
 *
 * Usage:
 *   <SplitChars text="Clearwater" className="split-char" />
 *   <SplitWords text="A restoration pipeline" className="split-word" />
 *
 * Each <span> gets a `data-index` attribute for GSAP stagger targeting.
 * The parent element should have `aria-label` with the full text for accessibility,
 * and the split spans should be `aria-hidden="true"` to avoid screen readers
 * reading individual characters.
 */

import React from "react";

type SplitCharsProps = {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  offset?: number;
};

type SplitWordsProps = {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  offset?: number;
};

/**
 * Splits a string into individual character <span> elements.
 * Spaces become non-breaking &nbsp; spans to preserve layout.
 */
export function SplitChars({ text, className = "split-char", as: Tag = "span", offset = 0 }: SplitCharsProps) {
  return (
    <Tag aria-label={text} role="text">
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={className}
          data-index={i + offset}
          aria-hidden="true"
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Splits a string into individual word <span> elements.
 * Preserves spaces between words as inline-block gaps.
 */
export function SplitWords({ text, className = "split-word", as: Tag = "span", offset = 0 }: SplitWordsProps) {
  const words = text.split(/\s+/);
  return (
    <Tag aria-label={text} role="text">
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span
            className={className}
            data-index={i + offset}
            aria-hidden="true"
            style={{ display: "inline-block" }}
          >
            {word}
          </span>
          {i < words.length - 1 && (
            <span aria-hidden="true" style={{ display: "inline-block" }}>
              {"\u00A0"}
            </span>
          )}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/**
 * A floating stat number that animates into position on scroll.
 * Wrap numeric values like "6ch", "512×512", "28.4 dB" with this component.
 */
export function FloatingStat({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`floating-stat ${className}`}>
      <span className="floating-stat-value">{value}</span>
      <span className="floating-stat-label">{label}</span>
    </div>
  );
}
