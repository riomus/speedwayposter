interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

export function Field({ label, value, onChange, placeholder, type = "text" }: FieldProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <label
        style={{
          color: "#9ab8d8",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: "rgba(30,109,181,0.08)",
          border: "1px solid rgba(30,109,181,0.3)",
          borderRadius: 6,
          color: "#ffffff",
          fontSize: 14,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 600,
          padding: "8px 12px",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#1e6db5")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(30,109,181,0.3)")}
      />
    </div>
  );
}
