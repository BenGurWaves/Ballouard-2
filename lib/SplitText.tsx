"use client";

interface SplitTextProps {
  text: string;
  className?: string;
}

export function SplitText({ text, className = "" }: SplitTextProps) {
  return (
    <span className={className} style={{ display: 'inline-block', paddingLeft: '0.05em' }}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{ 
            transitionDelay: `${index * 0.02}s`,
            padding: '0 0.02em'
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
