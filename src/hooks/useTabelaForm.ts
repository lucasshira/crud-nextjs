import { useState } from "react"

type Visivel = 'tabela' | 'form';

export default function useTabelaForm() {
  const [visivel, setVisivel] = useState<Visivel>('tabela');

  const exibirTabela = () => setVisivel('tabela');
  const exibirFormulario = () => setVisivel('form');
  
  return {
    formularioVisivel: visivel === 'form',
    tabelaVisivel: visivel === 'tabela',
    exibirTabela,
    exibirFormulario
  }
};