// CodigoFonte/src/features/dashboard/useWordOfDay.ts

import { useState, useEffect } from "react";
import { dataService } from "../../services/dataService";
import { Term } from "../../services/dataService";

export function useWordOfDay() {
    const palavras = [
    "Framework",
    "Compilador",
    "API",
    "Hook",
    "Endpoint",
    "Algoritmo",
    "Variável",
    "Classe",
    "Objeto",
    "Deploy",
  ];
  const [palavra, setPalavra] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Pega o dia atual do ano (0–365)
    const hoje = new Date();
    const diaDoAno = Math.floor(
      (hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // Seleciona a palavra com base no dia
    const palavraSelecionada = palavras[diaDoAno % palavras.length];

    setPalavra(palavraSelecionada);
    setLoading(false);
  }, []);

  return { palavra, loading };
}
