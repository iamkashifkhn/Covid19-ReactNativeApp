import * as React from 'react';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerR() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="World" component={World} />
      <Drawer.Screen name="Countries" component={Countries} />
      <Drawer.Screen name="Favourites" component={Favourites} />
    </Drawer.Navigator>
  );
}

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Drawer" component={DrawerR} />
        <Stack.Screen name="World" component={World} />
        <Stack.Screen name="Countries" component={Countries} />
        <Stack.Screen name="CountryDetail" component={CountryDetail}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function World({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const localObject = data;

  useEffect(() => {
    fetch('https://coronavirus-19-api.herokuapp.com/all')
      .then((response) => response.json())
      .then((json) => {
        return setData(json);
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 28, marginVertical: 10,fontWeight:'bold',paddingBottom:30 }}>
        World's Covid Report
      </Text>
      <View
        style={{
          width: '80%',
          padding: 15,
          marginBottom: 20,
          backgroundColor: '#4d4dff',
          borderRadius: 10,
        }}>
        <Text style={{color:'white', fontSize:18,}}> Total Cases: </Text>
        <Text style={{ color: 'white', fontSize: 18, fontWeight:"bold", }}> {data.cases}
        </Text>
      </View>
      <View
        style={{
          width: '80%',
          padding: 15,
          marginBottom: 20,
          backgroundColor: '#e84c3d',
          borderRadius: 10,
        }}>
        <Text style={{color:'white', fontSize:18,}}>Total Deaths:</Text>
        <Text style={{ color: 'white', fontSize: 18,fontWeight:"bold", }}>{data.deaths}</Text>
      </View>
      <View
        style={{
          width: '80%',
          padding: 15,
          marginBottom: 20,
          backgroundColor: '#70af85',
          borderRadius: 10,
        }}>
        <Text style={{color:'white', fontSize:18,}}>Total Recovered:</Text>
        <Text style={{ color: 'white', fontSize: 20, fontWeight:"bold",}}>
          {data.recovered}
        </Text>
      </View>
    </View>
  );
}

function Countries({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    fetch('https://coronavirus-19-api.herokuapp.com/countries')
      .then((response) => response.json())
      .then((json) => {
        return setData(json);
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  }, []);

  console.log("data"+data);
  return (
    <View style={styles.container}>
     
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white' }}> Loading ... </Text>
        </View>
      ) : (
        <View>
        <Text style={{ color: 'white', fontSize: 28, marginVertical: 10,fontWeight:'bold',marginBottom:30, justifyContent:"center",alignSelf:"center"}}>     
        Countries
      </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.country}
            renderItem={({ item }) => {
              return (
                <View style={{justifyContent:"center",alignItems:"center",}}>
                
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('CountryDetail',{
                        country: item.country,
                        confirmedcases: item.cases,
                        todayscases: item.todayCases,
                        deaths: item.deaths,
                        todaysdeaths: item.todayDeaths,
                        recovered: item.recovered,
                        activecases: item.active,
                     
                      });
                    }}
                    style={{padding:15,marginBottom:5,borderWidth:1,borderColor:"#cc0000",width:250,alignItems:"center",borderRadius:10}}>
                    <Text style={{fontSize:20,color:"white",textAlign:"center"}}>{item.country}</Text>
                    
                      
                    
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}


function CountryDetail({route,navigation}){
  const country = route.params
  const confirmedcases = route.params
  const todayscases = route.params
  const deaths = route.params
  const todaysdeaths = route.params
  const recovered = route.params
  const activecases= route.params

  

  return (
    <View style={styles.container1}>
   <Text style={{ color: 'white', fontSize: 28, marginVertical: 10,fontWeight:'bold',marginBottom:30, justifyContent:"center",alignSelf:"center"}}>     
        {country.country}
      </Text>
      <View style={{flexDirection:'row', justifyContent:'space-between',marginBottom:15}}>
      <View
        style={{
          width:160,
          height: 100,
          backgroundColor: '#3598db',
          borderRadius: 10,
          justifyContent: "center",
          alignItems:"center",
        }}>
        <Text style={{color:'white',fontSize: 18}}>Confirmed Cases: </Text>
        <Text style={{ color: 'white', fontSize: 20,fontWeight:"bold" }}>{country.confirmedcases}</Text>
      </View>
      <View style={{paddingLeft:10}}/>
      <View
        style={{
          width:160,
          height: 100,
          backgroundColor: '#63b4d6',
          borderRadius: 10,
          justifyContent: "center",
          alignItems:"center",
        }}>
        <Text style={{color:'white',fontSize: 18}}>Todays Cases: </Text>
        <Text style={{ color: 'white', fontSize: 20,fontWeight:"bold" }}>
         {country.todayscases}
        </Text>
      </View>
      </View>

      <View style={{flexDirection:'row', justifyContent: "space-between", marginBottom:15,}}>
      <View
        style={{
          width:160,
          height: 100,
          backgroundColor: '#e84c3d',
          borderRadius: 10,
          justifyContent: "center",
          alignItems:"center",
        }}>
        <Text style={{color:'white',fontSize: 18}}>Deaths: </Text>
        <Text style={{ color: 'white', fontSize: 20,fontWeight:"bold" }}>
        {country.deaths}
        </Text>
      </View>
      <View style={{paddingLeft:10}}/>
        <View
        style={{
          width:160,
          height: 100,
          backgroundColor: '#e66e63',
          borderRadius: 10,
          justifyContent: "center",
          alignItems:"center",
          paddingLeft:10,
        }}>
        <Text style={{color:'white',fontSize: 18}}>Todays Deaths: </Text>
        <Text style={{ color: 'white', fontSize: 20,fontWeight:"bold" }}>
        {country.todaysdeaths}
        </Text>
      </View>
      </View>

      <View style={{flexDirection:'row', justifyContent: "space-between",marginBottom:15,}}>
      <View
        style={{
          width:160,
          height: 100,
          backgroundColor: '#70ae85',
          borderRadius: 10,
          justifyContent: "center",
          alignItems:"center",
        }}>
        <Text style={{color:'white',fontSize: 18}}>Recovered: </Text>
        <Text style={{ color: 'white', fontSize: 20,fontWeight:"bold" }}>
        {country.recovered}
        </Text>
      </View>
      <View style={{paddingLeft:10}}/>
        <View
        style={{
          width:160,
          height: 100,
          backgroundColor: '#73d194',
          borderRadius: 10,
          justifyContent: "center",
          alignItems:"center",
          paddingLeft:10,
        }}>
        <Text style={{color:'white',fontSize: 18}}>Active Cases: </Text>
        <Text style={{ color: 'white', fontSize: 20,fontWeight:"bold" }}>
        {country.activecases}
        </Text>
      </View>
      </View>
    </View>

  )
}


function Favourites({navigation}){

  return(
    <View style={styles.container1}>
      <Text style={{ color: 'white', fontSize: 28, marginVertical: 10,fontWeight:'bold',marginBottom:30, justifyContent:"center",alignSelf:"center"}}>     
        Favourites</Text>
    
    </View>
  );

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#060930',
  },
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#060930',
    paddingTop:30,
  },
});