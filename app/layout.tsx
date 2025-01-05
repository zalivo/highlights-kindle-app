import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Kindle Highlights",
    description:
        "Easily translate your highlights from regular books into kindle highlights format",
    icons: {
        icon: "📚",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><text x='0' y='15' font-size='15'>📚</text></svg>"
                    type="image/svg+xml"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
