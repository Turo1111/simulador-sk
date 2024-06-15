import { Inter } from "next/font/google";
import "./globals.css";
import { createGlobalStyle } from "styled-components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SIMULADOR"
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
  }
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStyle />
        {children}
      </body>
    </html>
  );
}
