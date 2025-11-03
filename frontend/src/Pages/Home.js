import React from 'react'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import Grid from '../Components/Grid'
import Footer from '../Components/Footer'
import Icon from '../Components/Icon'
import Simple from '../Components/Simple'
import Contaccts from '../Components/Contaccts'
import Collections from './Collections'
import Product from './Product'



function Home() {

  return (
    <>
   <Banner />

   <Grid title1="LATEST" title2="COLLECTIONS" limit={10} />
   <Grid title1="BEST" title2="SELLER" limit={5} />
   



    </>
     
     
    
    
  )
}

export default Home
