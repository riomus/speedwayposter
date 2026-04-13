import React from "react";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
        marginTop: 4,
      }}
    >
      <div
        style={{
          width: 3,
          height: 16,
          background: "linear-gradient(to bottom, #f5c518, #1e6db5)",
          borderRadius: 2,
        }}
      />
      <span
        style={{
          color: "#ffffff",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        {children}
      </span>
    </div>
  );
}
