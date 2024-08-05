import useClients from "@/hooks/useClients";

import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";

export default function Home() {
  const { 
    cliente,
    clientes,
    tabelaVisivel,
    exibirTabela,
    novoCliente, 
    salvarCliente, 
    selecionarCliente, 
    excluirCliente 
  } = useClients();

  return (
    <div className="flex justify-center items-center min-h-screen
      bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Layout titulo="Cadastro Simples">
        {tabelaVisivel ? (
          <>
            <div className="flex justify-start">
              <Botao onClick={novoCliente} className="mb-4" cor="blue">
                Adicionar novo cliente
              </Botao>
            </div>
            <Tabela 
              clientes={clientes}
              clienteSelecionado={selecionarCliente}
              clienteExcluido={excluirCliente}
            />
          </>
        ) : (
          <Formulario 
            cancelado={() => exibirTabela()}
            cliente={cliente}
            clienteMudou={salvarCliente}
          />
        )}
      </Layout>
    </div>
  );
}
