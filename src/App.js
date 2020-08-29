import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import api from './services/api';
import styles from './styles';

export default function App() {
  const [repositories, setRepositories] = useState ([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },
  []);

  async function handleLikeRepository(id) {
  const response = await api.post(`repositories/${id}/like`);
  
    const likedRepository = response.data;

    const updatedRespository = repositories.map(repository =>{
      if (repository.id === id) {
        return likedRepository;
      }else{
        return repository;
      }
    })
    setRepositories(updatedRespository);

  }
 
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList 
        data = {repositories}
        keyExtractor={repository => repository.id}
        renderItem = {({item: repository})=>(

          <View style={styles.repositoryContainer}>

          <Text style={styles.repository}>{repository.title}</Text>

          <View style={styles.techsContainer}>
              {repository.techs.map(tech => 
                <Text style={styles.tech} key={tech} >
                  {tech} 
                </Text>
              )}
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              testID={`repository-likes-${repository.id}`}
            >
              {repository.likes} curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            testID={`like-button-${repository.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
        )}
        />
      </SafeAreaView>
    </>
  );
}
