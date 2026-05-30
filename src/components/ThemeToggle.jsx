export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      className="theme-btn"
      onClick={() => setDark(!dark)}
    >
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}