import React, { useState } from "react";

export function CeaserCipher() {
  const [userInput, setUserInput] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("0");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const handleEncryption = () => {
    const key = Number(encryptionKey) || 0;
    let nextEncrypted = "";

    for (const char of userInput) {
      const charCode = char.charCodeAt(0);
      const encryptedChar = String.fromCharCode(charCode + key);
      nextEncrypted += encryptedChar;
    }

    setEncryptedText(nextEncrypted);
    setDecryptedText("");
  };

  const handleDecryption = () => {
    const key = Number(encryptionKey) || 0;
    const source = encryptedText || userInput;
    let nextDecrypted = "";

    for (const char of source) {
      const charCode = char.charCodeAt(0);
      const decryptedChar = String.fromCharCode(charCode - key);
      nextDecrypted += decryptedChar;
    }

    setDecryptedText(nextDecrypted);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-3 text-center">
          <p className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-200 ring-1 ring-inset ring-indigo-500/30">
            Simple Caesar Cipher
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Encrypt and decrypt text with a numeric key
          </h1>
          <p className="text-slate-300">
            Type a message, choose a shift key, then encrypt or decrypt instantly.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-indigo-900/30">
          <div className="grid gap-6 p-6 sm:p-8">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-indigo-100">Message</span>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter text to encrypt"
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-base text-white placeholder:text-slate-500 shadow-inner shadow-black/40 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition"
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <label className="flex w-full flex-col space-y-2 sm:max-w-xs">
                <span className="text-sm font-semibold text-indigo-100">Key (number)</span>
                <input
                  type="number"
                  value={encryptionKey}
                  onChange={(e) => setEncryptionKey(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-base text-white placeholder:text-slate-500 shadow-inner shadow-black/40 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 transition"
                />
              </label>

              <div className="flex flex-1 gap-3 sm:justify-end">
                <button
                  onClick={handleEncryption}
                  disabled={!userInput}
                  className="flex-1 sm:flex-none rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/50 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                >
                  Encrypt
                </button>
                <button
                  onClick={handleDecryption}
                  disabled={!encryptedText && !userInput}
                  className="flex-1 sm:flex-none rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:border-indigo-300 hover:bg-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:border-white/5 disabled:text-slate-500"
                >
                  Decrypt
                </button>
              </div>
            </div>

            <div className="grid gap-4 rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-indigo-100">Encrypted</p>
                <p className="rounded-lg bg-slate-950/80 px-3 py-2 text-base text-slate-50 ring-1 ring-inset ring-white/5 min-h-[48px]">
                  {encryptedText || "—"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-indigo-100">Decrypted</p>
                <p className="rounded-lg bg-slate-950/80 px-3 py-2 text-base text-slate-50 ring-1 ring-inset ring-white/5 min-h-[48px]">
                  {decryptedText || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}