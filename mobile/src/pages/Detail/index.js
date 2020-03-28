import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar
  no caso "${incident.title}" com o valor de ${Intl
    .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
    .format(incident.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    // MailComposer.composeAsync({
    //   subject: 'Heroi do caso: Cadelinha atropelada',
    //   recipients: ['luis.pestanajr@gmail.com'],
    //   body: message
    // })
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=5521995158346&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather 
            name="arrow-left"
            color="#E82041"
            size={28}></Feather>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
      <Text style={[styles.incidentProperty, { marginTop: 0}]}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.uf}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {Intl
            .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
            .format(incident.value)}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato: </Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}