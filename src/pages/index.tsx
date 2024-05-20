import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";

export default function Home() {
  const clientes = [
    new Cliente('Anna', 19, '1'),
    new Cliente('Bia', 30, '2'),
    new Cliente('Pedro', 47, '3'),
    new Cliente('Carlos', 51, '4'),
  ];

  const clienteSelecionado = (cliente: Cliente) => {
    console.log(cliente.nome);
  };
  
  const clienteExcluido = (cliente: Cliente) => {
    console.log(cliente.nome + ' Excluir');
  };

  return (
    <div className="flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Layout titulo="Cadastro Simples">
        <Tabela 
          clientes={clientes} 
          clienteSelecionado={clienteSelecionado} 
          clienteExcluido={clienteExcluido}
        />
      </Layout>
    </div>
  );
}
