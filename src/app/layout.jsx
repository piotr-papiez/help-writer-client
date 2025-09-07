import { Work_Sans, Roboto_Mono, Open_Sans } from "next/font/google";
import "./globals.css";

const fontWorkSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

const fontRobotoSlab = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"]
});

const fontOpenSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata = {
  title: "Help Writer",
  description: "Sellasist Help Writer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
        />
      </head>
      <body className={`${fontWorkSans.variable} ${fontRobotoSlab.variable} ${fontOpenSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
