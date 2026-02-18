"use client";

import { useState, useRef } from "react";

const DAD_QUOTES = [
  "PapaJi soch rahe hain... 🤔",
  "Pehle light check karo, beta...",
  "Hmm, yeh toh maine pehle bhi fix kiya hai...",
  "Ek minute, toolkit nikal raha hoon... 🧰",
  "Beta, tension mat lo, PapaJi hain na!",
  "Sab theek ho jayega, dekhna... 🔧",
];

interface Diagnosis {
  problem: string;
  difficulty: number;
  tools: string[];
  steps: string[];
  parts: { name: string; estimatedCost: string }[];
  safetyWarnings: string[];
  dadAdvice: string;
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setDiagnosis(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const diagnose = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setDiagnosis(null);

    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % DAD_QUOTES.length);
    }, 2500);

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setDiagnosis(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Kuch toh gadbad hai! Try again.");
    } finally {
      setLoading(false);
      clearInterval(interval);
    }
  };

  const difficultyLabel = (d: number) => {
    const labels = [
      "",
      "Beta, 2 minute ka kaam ✌️",
      "Thoda dhyan se karna 👍",
      "YouTube dekh ke kar loge 📺",
      "Expert help le lo, beta 🤝",
      "Professional bulao! ⚠️",
    ];
    return labels[d] || "";
  };

  const share = async () => {
    if (!diagnosis) return;
    const text = `PapaJi diagnosed my problem! 🔧\n\n${diagnosis.problem}\nDifficulty: ${"⭐".repeat(diagnosis.difficulty)}/5\n\nTry it: `;
    if (navigator.share) {
      await navigator.share({ title: "PapaJi Fix", text });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  const reset = () => {
    setImage(null);
    setDiagnosis(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <main className="max-w-lg mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-2">🔧</div>
        <h1 className="text-4xl font-black text-[#1E3A5F]">
          Papa<span className="text-[#F97316]">Ji</span>
        </h1>
        <p className="text-[#1E3A5F]/70 mt-2 text-lg">
          Ab har phone mein ek PapaJi
        </p>
      </div>

      {/* Upload Section */}
      {!diagnosis && (
        <div className="space-y-4">
          <div
            onClick={() => fileRef.current?.click()}
            className="border-3 border-dashed border-[#F97316]/40 rounded-2xl p-8 text-center cursor-pointer hover:border-[#F97316] hover:bg-[#F97316]/5 transition-all"
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="max-h-64 mx-auto rounded-xl shadow-lg"
              />
            ) : (
              <div>
                <div className="text-5xl mb-3">📸</div>
                <p className="text-[#1E3A5F]/60 text-lg font-medium">
                  Kya toot gaya? Photo dikhao!
                </p>
                <p className="text-[#1E3A5F]/40 text-sm mt-1">
                  Tap to take a photo or upload
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImage}
            className="hidden"
          />

          {image && !loading && (
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 py-4 rounded-xl font-bold text-[#1E3A5F] bg-[#1E3A5F]/10 hover:bg-[#1E3A5F]/20 transition-all"
              >
                Dobara Daalo
              </button>
              <button
                onClick={diagnose}
                className="flex-2 py-4 rounded-xl font-bold text-white bg-[#F97316] hover:bg-[#F97316]/90 shadow-lg shadow-[#F97316]/30 transition-all text-lg"
              >
                🔧 PapaJi, Dekho!
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <div className="text-5xl animate-pulse-gentle mb-4">🧔</div>
              <p className="text-[#1E3A5F] text-lg font-medium animate-pulse">
                {DAD_QUOTES[quoteIndex]}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Diagnosis Result */}
      {diagnosis && (
        <div className="space-y-4 animate-[fadeIn_0.5s_ease-in]">
          {/* Problem Card */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-[#F97316]/20">
            <h2 className="text-sm font-bold text-[#F97316] uppercase tracking-wide mb-2">
              🔍 Problem Found
            </h2>
            <p className="text-[#1E3A5F] text-lg font-medium">{diagnosis.problem}</p>
          </div>

          {/* Difficulty Meter */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-[#F97316]/20">
            <h2 className="text-sm font-bold text-[#F97316] uppercase tracking-wide mb-3">
              💪 Difficulty
            </h2>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-3 flex-1 rounded-full ${
                    i <= diagnosis.difficulty
                      ? diagnosis.difficulty <= 2
                        ? "bg-green-400"
                        : diagnosis.difficulty <= 3
                        ? "bg-yellow-400"
                        : "bg-red-400"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-[#1E3A5F]/70 text-sm">{difficultyLabel(diagnosis.difficulty)}</p>
          </div>

          {/* Tools Needed */}
          {diagnosis.tools.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-md border border-[#F97316]/20">
              <h2 className="text-sm font-bold text-[#F97316] uppercase tracking-wide mb-3">
                🧰 Tools Chahiye
              </h2>
              <div className="flex flex-wrap gap-2">
                {diagnosis.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-[#FFF8F0] border border-[#F97316]/20 rounded-lg text-sm font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-[#F97316]/20">
            <h2 className="text-sm font-bold text-[#F97316] uppercase tracking-wide mb-3">
              📋 Step-by-Step Guide
            </h2>
            <div className="space-y-3">
              {diagnosis.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-[#1E3A5F]/80 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Parts List */}
          {diagnosis.parts.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-md border border-[#F97316]/20">
              <h2 className="text-sm font-bold text-[#F97316] uppercase tracking-wide mb-3">
                🛒 Parts & Cost
              </h2>
              {diagnosis.parts.map((part, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-[#1E3A5F]">{part.name}</span>
                  <span className="text-[#F97316] font-bold">{part.estimatedCost}</span>
                </div>
              ))}
            </div>
          )}

          {/* Safety Warnings */}
          {diagnosis.safetyWarnings.length > 0 && (
            <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
              <h2 className="text-sm font-bold text-red-500 uppercase tracking-wide mb-2">
                ⚠️ Safety Warning
              </h2>
              {diagnosis.safetyWarnings.map((w, i) => (
                <p key={i} className="text-red-700 text-sm">{w}</p>
              ))}
            </div>
          )}

          {/* Dad Advice */}
          {diagnosis.dadAdvice && (
            <div className="bg-[#1E3A5F] rounded-2xl p-5 text-white">
              <p className="text-sm font-bold text-[#F97316] uppercase tracking-wide mb-2">
                🧔 PapaJi Kehte Hain
              </p>
              <p className="text-white/90 italic">&ldquo;{diagnosis.dadAdvice}&rdquo;</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={reset}
              className="flex-1 py-4 rounded-xl font-bold text-[#1E3A5F] bg-[#1E3A5F]/10 hover:bg-[#1E3A5F]/20 transition-all"
            >
              Aur Kuch Toota?
            </button>
            <button
              onClick={share}
              className="flex-1 py-4 rounded-xl font-bold text-white bg-[#F97316] hover:bg-[#F97316]/90 shadow-lg shadow-[#F97316]/30 transition-all"
            >
              📤 Share Fix
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-12 text-[#1E3A5F]/30 text-sm">
        Made with ❤️ and jugaad
      </footer>
    </main>
  );
}
