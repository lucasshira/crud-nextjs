import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import firebase from "../config";

export default class ColecaoCliente implements ClienteRepositorio {
  #conversor = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      };
    },
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
      const dados = snapshot.data(options);
      if (!dados) {
        throw new Error("Dados do snapshot não encontrados");
      }
      return new Cliente(dados.nome, dados.idade, snapshot.id);
    }
  }

  private colecao() {
    return firebase.firestore().collection('clientes').withConverter(this.#conversor);
  }

  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      await this.colecao().doc(cliente.id).set(cliente);
      return cliente;
    } else {
      const docRef = await this.colecao().add(cliente);
      const doc = await docRef.get();
      return doc.data()!;
    }
  }

  async excluir(cliente: Cliente): Promise<void> {
    if (cliente?.id) {
      await this.colecao().doc(cliente.id).delete();
    } else {
      throw new Error('Cliente deve ter um ID para ser excluído');
    }
  }

  async obterTodos(): Promise<Cliente[]> {
    const query = await this.colecao().get();
    return query.docs.map(doc => doc.data()) ?? [];
  }
}
