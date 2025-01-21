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
  const [appsIsOpen, setAppsIsOpen] = useState(false);
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
      <header className="flex flex-grow px-5 py-2 border-b border-gray-200">
        <div className="flex-none">
          <div className="flex flex-grow mt-1">
            <button className="hover:bg-gray-100 rounded-full w-9 h-9 mr-2 transition-colors duration-100">
              <i className="mdi mdi-menu text-gray-500"></i>
            </button>
            <a href="https://translate.google.com.tr">
              <img
                src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
                alt="Logo"
                className="mt-2"
              />
            </a>
            <div
              onClick={handleTranslate}
              className="ml-2 my-auto text-lg font-medium text-gray-500"
            >
              Translate
            </div>
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="flex-none">
          <div className="flex">
            <button
              className="hover:bg-gray-100 rounded-full w-9 h-9 mt-1 mr-2 transition-colors duration-100"
              onClick={() => setAppsIsOpen(!appsIsOpen)}
            >
              <i className="mdi mdi-apps text-gray-500"></i>
            </button>
            <button className="m-1">
              <img
                src="https://avatars0.githubusercontent.com/u/17010054?v=4"
                alt="Avatar"
                className="object-cover w-9 h-9 rounded-full border shadow"
              />
            </button>
          </div>
          {appsIsOpen && (
            <div className="apps-container flex flex-wrap absolute bg-white shadow-md right-5 top-18 px-4 py-2 rounded-md border h-96 overflow-x-hidden overflow-y-scroll custom-scrollbar">
              <button className="border border-blue-200 text-center text-blue-600 hover:bg-blue-50/50 hover:text-blue-700 mx-auto px-3 py-1 mb-4 mt-10 rounded transition-all duration-50">
                More from Google
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="before:content-[''] before:bg-gray-50 before:h-24 before:w-full before:absolute before:border-b before:border-gray-200 before:z-0 z-10">
        <div className="container mx-auto px-0 lg:px-24">
          <div className="flex">
            <div className="py-4 z-10">
              <button
                className="rounded px-3 py-1 bg-blue-100 border border-blue-200 text-base text-blue-700 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600"
                onClick={() => handleTranslate}
              >
                <i className="mdi mdi-translate"></i> Text
              </button>
              <button className="rounded px-3 py-1 ml-1 border border-blue-200 text-base text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600">
                <i className="mdi mdi-file"></i> Document
              </button>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="pb-4 top-32 h z-10 w-full">
              <div className="bg-white rounded-lg border border-gray-200 drop-shadow-sm shadow-sm">
                <div className="flex border-b border-gray-300">
                  <div className="w-7/12">
                    <nav className="flex flex-row rounded-tl-lg">
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
                          <i className="mdi mdi-loading mdi-spin"></i>
                        ) : (
                          "Translate"
                        )}
                      </button>

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
