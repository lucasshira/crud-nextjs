import { useState } from "react";

import Entrada from "./Entrada";
import Cliente from "@/core/Cliente";
import Botao from "./Botao";

interface FormularioProps {
  cliente: Cliente
}

const Formulario = (props: FormularioProps) => {
  const id = props.cliente?.id

  const [nome, setNome] = useState(props.cliente?.nome ?? '');
  const [idade, setIdade] = useState(props.cliente?.idade ?? 0);

  return (
    <div className="bg-gray-200 rounded-lg p-4">
      {id ? (
        <Entrada texto="Código" valor={id} somenteLeitura className="mb-5" />
      ) : false}
      <Entrada texto="Nome" valor={nome} valorMudou={setNome} className="mb-5" />
      <Entrada texto="Idade" tipo="number" valor={idade} valorMudou={setIdade} />
      <div className="mt-7 flex justify-end">
        <Botao cor="blue" className="mr-2">
          {id ? 'Alterar' : 'Salvar'}
        </Botao>
        <Botao>
          Cancelar
        </Botao>
      </div>
    </div>
  );
}
 
export default Formulario;