import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import { useState } from "react";

export default function Home() {

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');

  const clientes = [
    new Cliente('Anna', 19, '1'),
    new Cliente('Bia', 30, '2'),
    new Cliente('Pedro', 47, '3'),
    new Cliente('Carlos', 51, '4'),
  ];

  const clienteSelecionado = (cliente: Cliente) => {
    setCliente(cliente);
    setVisivel('form');
  };
  
  const clienteExcluido = (cliente: Cliente) => {
    console.log(cliente.nome + ' Excluir');
  };

  const salvarCliente = (cliente: Cliente) => {
    console.log(cliente);
    setVisivel('tabela');
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
