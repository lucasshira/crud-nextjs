import { useEffect, useState } from "react";
import Cliente from "@/core/Cliente";
import ColecaoCliente from "@/backend/db/ColecaoCliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import useTabelaForm from "./useTabelaForm";

export default function useClients() {
  const repo: ClienteRepositorio = new ColecaoCliente();

  const { exibirFormulario, exibirTabela, tabelaVisivel } = useTabelaForm();

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const obterTodos = () => {
    repo.obterTodos(cliente).then(clientes => {
      setClientes(clientes);
      exibirTabela();
    })
  }

  useEffect(obterTodos, []);

  const selecionarCliente = (cliente: Cliente) => {
    setCliente(cliente);
    exibirFormulario();
  };
  
  const excluirCliente = async (cliente: Cliente) => {
    await repo.excluir(cliente);
    obterTodos();
  };

  const salvarCliente = async (cliente: Cliente) => {
    await repo.salvar(cliente);
    obterTodos();
  };

  const novoCliente = () => {
    setCliente(Cliente.vazio());
    exibirFormulario();
  };

  return {
    cliente,
    clientes,
    tabelaVisivel,
    exibirTabela,
    salvarCliente,
    novoCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos,
  }
}