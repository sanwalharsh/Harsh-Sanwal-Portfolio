import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Caveat,
  Instrument_Serif,
  Sacramento,
} from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sacramento = Sacramento({
  subsets: ["latin"],
  variable: "--font-sacramento",
  weight: ["400"],
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harsh Sanwal — Data & ML",
  description:
    "Data analyst and machine learning engineer working on forecasting, anomaly detection, knowledge graphs and multi-agent AI systems.",
  openGraph: {
    title: "Harsh Sanwal — Data & ML",
    description:
      "Forecasting, anomaly detection, knowledge graphs and multi-agent AI systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${caveat.variable} ${sacramento.variable} ${instrument.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
