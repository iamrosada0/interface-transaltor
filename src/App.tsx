// src/components/Translate.tsx

import React, { useState } from "react";
import axios from "axios";

// Tipagem para o estado da aplicação
interface TranslateResponse {
  translated_text: string;
}

interface TranslateError {
  error: string;
}

const Translate: React.FC = () => {
  // Estados para o texto de entrada, texto traduzido, direção da tradução e erro
  const [text, setText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [direction, setDirection] = useState<string>("Portuguese to English");
  const [error, setError] = useState<string>("");

  // Função para lidar com o envio da tradução
  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text) {
      setError("Por favor, insira o texto para tradução.");
      return;
    }

    try {
      // Enviar a requisição POST para o Flask Backend
      const response = await axios.post<TranslateResponse | TranslateError>(
        "https://python-api-eight.vercel.app/translate",
        {
          text,
          direction,
        }
      );

      // Se a tradução for bem-sucedida
      if ("translated_text" in response.data) {
        setTranslatedText(response.data.translated_text);
        setError("");
      } else {
        // Se houver erro
        setError(response.data.error);
        setTranslatedText("");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Caso o erro seja uma instância de erro do axios, podemos acessar a resposta de erro
        setError(
          err.response?.data?.error || "Erro na tradução. Tente novamente."
        );
      } else {
        // Caso seja outro tipo de erro
        setError("Erro inesperado. Tente novamente.");
      }
      setTranslatedText("");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center my-4">Tradutor</h1>

      <form onSubmit={handleTranslate} className="space-y-4">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite o texto para traduzir"
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="mr-2">Direção da Tradução:</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Portuguese to English">Português para Inglês</option>
            <option value="English to Portuguese">Inglês para Português</option>
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Traduzir
          </button>
        </div>
      </form>

      {translatedText && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Texto Traduzido:</h2>
          <p className="p-2 bg-gray-100 border border-gray-300 rounded">
            {translatedText}
          </p>
        </div>
      )}
    </div>
  );
};

export default Translate;
