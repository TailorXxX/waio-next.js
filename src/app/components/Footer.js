// src/components/Footer.js
export default function Footer() {
  return (
    <footer style={{ padding: '1rem', marginTop: '2rem' }}>
      © {new Date().getFullYear()} My Headless Site
    </footer>
  );
}
