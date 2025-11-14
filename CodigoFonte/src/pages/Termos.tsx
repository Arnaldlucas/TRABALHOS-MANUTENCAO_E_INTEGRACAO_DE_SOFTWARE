import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase-config"; 
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentData, // Importe os tipos do Firestore
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { BookOpenText, Loader, AlertCircle } from "lucide-react";
// 1. Importe nossa interface 'Term' do dataService!
import { Term } from "../services/dataService"; 

const PAGE_SIZE = 9; 

export default function Termos() {
  // 2. Tipe os estados
  const [terms, setTerms] = useState<Term[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    const fetchInitialTerms = async () => {
      try {
        const firstBatch = query(
          collection(db, "terms"),
          orderBy("term"),
          limit(PAGE_SIZE)
        );
        const documentSnapshots = await getDocs(firstBatch);

        // 3. Afirme o tipo dos dados
        const termsData = documentSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Term)); 

        setTerms(termsData);
        
        const lastDoc =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastVisible(lastDoc || null); // Garanta que pode ser nulo

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

  const handleLoadMore = async () => {
    if (!lastVisible) return; 

    setIsLoadingMore(true);
    try {
      const nextBatch = query(
        collection(db, "terms"),
        orderBy("term"),
        startAfter(lastVisible), 
        limit(PAGE_SIZE)
      );

      const documentSnapshots = await getDocs(nextBatch);
      // 4. Afirme o tipo dos novos dados
      const newTermsData = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Term));

      setTerms((prevTerms) => [...prevTerms, ...newTermsData]);

      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc || null);

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
    // ... (Seu JSX de loading)
    return <div className="flex justify-center items-center min-h-screen"><Loader className="animate-spin text-blue-600" size={40} /></div>;
  }
  if (error) {
    // ... (Seu JSX de erro)
    return <div className="flex flex-col items-center justify-center min-h-screen text-red-600"><AlertCircle size={40} /><p className="mt-4 text-center">{error}</p></div>;
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-10 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <BookOpenText className="text-blue-600 w-6 h-6" />
          <h1 className="text-2xl font-bold">Termos de Programação</h1>
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