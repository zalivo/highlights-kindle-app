import { Footer } from "@/components/Footer";
import { HighlightForm } from "@/components/HighlightForm";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
    return (
        <main
            className={`min-h-screen p-8 bg-gray-100 ${spaceGrotesk.className}`}
        >
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Kindle Highlight Formatter
                </h1>
                <HighlightForm />
                <Footer />
            </div>
        </main>
    );
}
