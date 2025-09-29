import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native';
import { FlatList } from 'react-native';


export default function App() {
  // Usando o hook useState para criar uma variável de estado 'tarefas'.
  // O valor inicial é um array com duas tarefas de exemplo.
  // 'tarefas' guarda o valor atual.
  // 'setTarefas' é a função que usamos para ATUALIZAR o valor.
  const [tarefas, setTarefas] = useState([/* ... */]);
  // Novo estado para guardar o texto do input
  const [textoInput, setTextoInput] = useState('');

  const adicionarTarefa = () => {
    if (textoInput.trim().length > 0) {
      // NUNCA modifique o estado diretamente (ex: tarefas.push(...))
      // Sempre use a função de atualização (setTarefas)
      setTarefas([...tarefas, { id: Math.random().toString(), texto: textoInput }]);
      setTextoInput(''); // Limpa o input após adicionar
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Lista de Tarefas</Text>
      
      {/* Seção para adicionar tarefas */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={textoInput}
          onChangeText={setTextoInput} // Atualiza o estado 'textoInput' a cada digitação
        />
        <Button title="Adicionar" onPress={adicionarTarefa} />
      </View>

      <Text>Você tem {tarefas.length} tarefas.</Text>
      <FlatList
        data={tarefas}
        // renderItem recebe um objeto que contém o 'item' a ser renderizado
        renderItem={({ item }) => (
          <View style={styles.itemLista}>
            <Text>{item.texto}</Text>
          </View>
        )}
        // keyExtractor diz à FlatList como encontrar uma chave única para cada item
        keyExtractor={(item) => item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  // ... (container, title)
  inputContainer: {
    flexDirection: 'row', // Alinha os filhos (TextInput e Button) na horizontal
    justifyContent: 'space-between', // Espaço entre eles
    alignItems: 'center', // Alinha verticalmente no centro
    marginBottom: 20,
  },
  input: {
    flex: 1, // Faz o TextInput ocupar o máximo de espaço possível na linha
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  itemLista: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2, // Sombra para Android
  },
});

