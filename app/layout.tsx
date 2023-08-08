"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { store } from "./store";
import { Provider } from "react-redux";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>WhatsApp</title>
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
      </head>
      <body>
        <SessionProvider>
          <Provider store={store}>{props.children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
