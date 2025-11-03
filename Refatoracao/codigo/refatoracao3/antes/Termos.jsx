import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase-config";
// 1. Importe as funções necessárias para a paginação
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { BookOpenText, Search, Loader, AlertCircle } from "lucide-react";

const PAGE_SIZE = 9; // Quantos termos carregar por vez

export default function Termos() {
  const [terms, setTerms] = useState([]); // Armazenará os termos carregados
  const [loading, setLoading] = useState(true); // Loading inicial da página
  const [error, setError] = useState(null);

  // 2. Novos estados para controlar a paginação
  const [lastVisible, setLastVisible] = useState(null); // Guarda o "cursor" para o último documento
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading do botão "Carregar Mais"
  const [hasMore, setHasMore] = useState(true); // Indica se ainda há mais termos para carregar

  // 3. Efeito para buscar a PRIMEIRA página de dados
  useEffect(() => {
    const fetchInitialTerms = async () => {
      try {
        const firstBatch = query(
          collection(db, "terms"),
          orderBy("term"),
          limit(PAGE_SIZE)
        );
        const documentSnapshots = await getDocs(firstBatch);

        const termsData = documentSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTerms(termsData);
        // Guarda o último documento da leva para usar como ponto de partida da próxima busca
        const lastDoc =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastVisible(lastDoc);

        // Se o número de documentos for menor que o tamanho da página, não há mais o que carregar
        if (termsData.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Erro ao buscar termos:", err);
        setError(
          "Não foi possível carregar os termos. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInitialTerms();
  }, []);

  // 4. Função para carregar as próximas páginas
  const handleLoadMore = async () => {
    if (!lastVisible) return; // Não faz nada se não tiver um ponto de partida

    setIsLoadingMore(true);
    try {
      const nextBatch = query(
        collection(db, "terms"),
        orderBy("term"),
        startAfter(lastVisible), // Começa a busca DEPOIS do último documento que vimos
        limit(PAGE_SIZE)
      );

      const documentSnapshots = await getDocs(nextBatch);
      const newTermsData = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Adiciona os novos termos à lista existente
      setTerms((prevTerms) => [...prevTerms, ...newTermsData]);

      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc);

      if (newTermsData.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Erro ao carregar mais termos:", err);
      setError("Ocorreu um erro ao carregar mais termos.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (loading) {
    /* ... JSX do loading ... */
  }
  if (error) {
    /* ... JSX do erro ... */
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <BookOpenText className="text-blue-600 w-6 h-6" />
          <h1 className="text-2xl font-bold">Termos de Programação</h1>
        </div>

        {/* TODO: A busca atual (frontend) foi desabilitada devido à paginação.
            A próxima manutenção deve implementar uma busca no servidor (backend)
            usando as capacidades de query do Firestore. */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="A busca será implementada em uma futura versão"
            disabled
            className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 cursor-not-allowed"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {terms.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-sm p-6 rounded-xl border hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-1 text-blue-700">
                {item.term}{" "}
                <span className="text-gray-500 text-sm">
                  ({item.translation})
                </span>
              </h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* 5. Botão "Carregar Mais" dinâmico */}
        <div className="mt-12 text-center">
          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-6 py-3 bg-blue-100 text-blue-800 font-semibold rounded hover:bg-blue-200 transition disabled:opacity-50"
            >
              {isLoadingMore ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                "Carregar Mais Termos"
              )}
            </button>
          )}
          {!hasMore && (
            <p className="text-gray-500">Você chegou ao fim da lista!</p>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
