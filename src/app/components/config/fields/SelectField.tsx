interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
          appearance: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#1e6db5")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(30,109,181,0.3)")}
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id} style={{ background: "#060b18", color: "#fff" }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
