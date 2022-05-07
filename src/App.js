 
import './App.css';
import { useEffect,useState } from 'react';
import axios from 'axios'
import Coin from './Coin';
const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false"

function App() {
  const [Coins, setCoins] = useState([]);
  const [Search, setSearch] = useState('')
  useEffect(() =>{
     axios
     .get(url)
     .then((res)=>{
        setCoins(res.data)
      //  console.log(Coins);  
     })
     .catch((err)=>{
       console.log(err);
     })
  }, [])
  const handleChange=(e)=>{
    setSearch(e.target.value);
  }
  const fillCoins= Coins.filter( coin=> coin.name.toLowerCase().includes(Search.toLowerCase()));
  console.log(fillCoins);
  return (
    <>
    <div className="coin-app">
       <div className="coin-search">
         <h1 className="coin-text">
           Search a currency 
         </h1>
         <form>
           <input type="text" placeholder='Search' className='coin-input' onChange={handleChange}/>
         </form>
         <div className='titles'>
           <p>Name</p>
           <p>Symbol</p>
           <p>Price</p>
           <p>Volume</p>
           <p>% change</p>
           <p>Market Cap</p>
         </div>
       </div>
       
       {fillCoins.map( ele => {
         return(
           
          <Coin key={ele.id}
           image={ele.image}
           symbol={ele.symbol} 
           name={ele.name} 
           price={ele.current_price} 
           volume={ele.total_volume} 
           priceChange = {ele.price_change_percentage_24h}
           marketcap = {ele.market_cap}
           />
         )
       })}
    </div>      
    </>
  );
}

export default App;
