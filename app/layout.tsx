import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Kindle Highlights",
    description:
        "Easily translate your highlights from regular books into kindle highlights format",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
