import "./globals.css";

export const metadata = {
  title: "CareerHub",
  description: "Modern Job Portal"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#070b18] text-slate-100">{children}</body>
    </html>
  );
}