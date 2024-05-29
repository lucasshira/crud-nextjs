import ColecaoCliente from "@/backend/db/ColecaoCliente";
import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { useEffect, useState } from "react";

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');

  const obterTodos = () => {
    repo.obterTodos(cliente).then(clientes => {
      setClientes(clientes)
      setVisivel('tabela');
    })
  }

  useEffect(obterTodos, []);

  const clienteSelecionado = (cliente: Cliente) => {
    setCliente(cliente);
    setVisivel('form');
  };
  
  const clienteExcluido = async (cliente: Cliente) => {
    await repo.excluir(cliente);
    obterTodos();
  };

  const salvarCliente = async (cliente: Cliente) => {
    await repo.salvar(cliente);
    obterTodos();
  };

  const novoCliente = () => {
    setCliente(Cliente.vazio());
    setVisivel('form');
  };

  return (
    <div className="flex justify-center items-center min-h-screen
      bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao onClick={novoCliente} className="mb-4" cor="green">
                Novo cliente
              </Botao>
            </div>
            <Tabela 
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            />
          </>
        ) : (
          <Formulario 
            cancelado={() => setVisivel('tabela')}
            cliente={cliente}
            clienteMudou={salvarCliente}
          />
        )}
      </Layout>
    </div>
  );
}
