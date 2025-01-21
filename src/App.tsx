import { useState } from "react";
import axios from "axios";

// Tipagem para o estado da aplicação
interface TranslateResponse {
  translated_text: string;
}

interface TranslateError {
  error: string;
}

export const Translator = () => {
  const [text, setText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [direction, setDirection] = useState<string>("English to Portuguese");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // Novo estado de loading

  // Função para lidar com o envio da tradução
  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text) {
      setError("Por favor, insira o texto para tradução.");
      return;
    }

    setIsLoading(true); // Iniciar loading
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
        // Caso o erro seja uma instância de erro do axios
        setError(
          err.response?.data?.error || "Erro na tradução. Tente novamente."
        );
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
      setTranslatedText("");
    } finally {
      setIsLoading(false); // Parar o loading
    }
  };

  return (
    <div className="relative bg-white">
      <div className="before:content-[''] before:bg-gray-50 before:h-24 before:w-full before:absolute before:border-b before:border-gray-200 before:z-0 z-10">
        <div className="container mx-auto px-0 lg:px-24">
          <div className="flex">
            <div className="py-4 z-10">
              <button
                onClick={handleTranslate}
                disabled={!text || isLoading}
                className={`uppercase py-3.5 px-3 text-gray-600 font-semibold text-xs lg:text-sm rounded-tl-lg 
              ${
                !text || isLoading
                  ? "bg-gray-200 cursor-not-allowed"
                  : "hover:bg-gray-50 hover:text-gray-700 transition-colors duration-100"
              }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <span className="ml-2">Translating...</span>
                  </div>
                ) : (
                  "Translate"
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="pb-4 top-32 h z-10 w-full">
              <div className="bg-white rounded-lg border border-gray-200 drop-shadow-sm shadow-sm">
                <div className="flex border-b border-gray-300">
                  <div className="w-7/12">
                    <nav className="flex flex-row rounded-tl-lg">
                      {/* <button
                        onClick={handleTranslate}
                        disabled={!text || isLoading}
                        className={`uppercase py-3.5 px-3 text-gray-600 font-semibold text-xs lg:text-sm rounded-tl-lg 
                          ${
                            !text || isLoading
                              ? "bg-gray-200 cursor-not-allowed"
                              : "hover:bg-gray-50 hover:text-gray-700 transition-colors duration-100"
                          }`}
                      >
                        {isLoading ? (
                          <i className="mdi mdi-loading mdi-spin"></i>
                        ) : (
                          "Translate"
                        )}
                      </button> */}

                      <button
                        onClick={() => setDirection("English to Portuguese")}
                        className={`uppercase py-3.5 px-3 text-gray-600 font-semibold text-xs lg:text-sm hover:bg-gray-50 hover:text-gray-700 transition-colors duration-100 text-blue-500 
                          ${
                            direction === "English to Portuguese"
                              ? "border-b-2 border-blue-500"
                              : ""
                          }`}
                      >
                        English To Portuguese
                      </button>
                      <button
                        onClick={() => setDirection("Portuguese to English")}
                        className={`uppercase py-3.5 px-3 text-gray-600 font-semibold text-xs lg:text-sm hover:bg-gray-50 hover:text-gray-700 transition-colors duration-100 
                          ${
                            direction === "Portuguese to English"
                              ? "border-b-2 border-blue-500"
                              : ""
                          }`}
                      >
                        Portuguese to English
                      </button>
                    </nav>
                  </div>

                  <div className="w-1/12">
                    <div className="flex items-center justify-center">
                      <button className="hover:bg-gray-100 rounded-full w-10 h-10 mt-1 transition-colors duration-100">
                        <i className="mdi mdi-swap-horizontal mdi-24px text-gray-600"></i>
                      </button>
                    </div>
                  </div>

                  <div className="w-7/12">
                    <nav className="flex flex-row rounded-tl-lg">
                      <button className="uppercase py-3.5 px-3 text-gray-600 font-semibold text-xs lg:text-sm hover:bg-gray-50 hover:text-gray-700 transition-colors duration-100">
                        Translation
                      </button>
                    </nav>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-6/12 border-r border-gray-200 p-4">
                    <div className="h-40">
                      <div className="flex flex-row">
                        <textarea
                          className="bg-white resize-none w-full focus:outline-none text-base lg:text-2xl text-black custom-scrollbar"
                          spellCheck="false"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        />
                        {text.length > 0 && (
                          <button
                            className="hover:bg-gray-100 rounded-full w-9 h-9 mt-2"
                            onClick={() => setText("")}
                          >
                            <i className="mdi mdi-close text-gray-500"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-6/12 p-4">
                    <div className="h-40">
                      <div className="flex flex-row">
                        <textarea
                          className="bg-white resize-none w-full focus:outline-none text-base lg:text-2xl text-black custom-scrollbar"
                          spellCheck="false"
                          value={translatedText}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};
