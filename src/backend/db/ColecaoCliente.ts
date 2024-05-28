import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default class ColecaoCliente implements ClienteRepositorio {

  conversor = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      };
    },
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
      const dados = snapshot.data(options);
      return new Cliente(dados.nome, dados.idade, snapshot.id);
    }
  }

  private colecao() {
    return firebase.firestore().collection('clientes').withConverter(this.conversor);
  }

  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      await this.colecao().doc(cliente.id).set(this.conversor.toFirestore(cliente));
      return cliente;
    } else {
      const docRef = await this.colecao().add(this.conversor.toFirestore(cliente));
      const doc = await docRef.get();
      const dados = doc.data();
      if (dados) {
        return this.conversor.fromFirestore(doc, {});
      } else {
        throw new Error('Erro ao obter dados do cliente após a criação');
      }
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
    const querySnapshot = await this.colecao().get();
    return querySnapshot.docs.map(doc => this.conversor.fromFirestore(doc, {}));
  }
}