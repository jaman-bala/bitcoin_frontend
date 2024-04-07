import React, { useEffect, useState } from 'react';
import { Menu, Spin } from 'antd';
import axios from 'axios';
import CryptocurrencyCard from './components/CryptocurrenctCard';

const { SubMenu } = Menu;

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    setCurrencyData(null);
    fetchCurrency();
  }, [currencyId]);

  const fetchCurrencies = () => {
    axios.get('http://127.0.0.1:8000/cryptocurrencies/')
      .then(response => {
        const currenciesResponse = response.data;
        const menuItems = currenciesResponse.map(c => ({
          label: c.name,
          key: c.id.toString(), // Convert id to string as keys must be strings
        }));
        setCurrencies(menuItems);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  };

  const fetchCurrency = () => {
    axios.get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}`)
      .then(response => {
        setCurrencyData(response.data);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  };

  const onClick = (e) => {
    setCurrencyId(e.key)
  };

  return (
    <div className='flex'>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        className="h-screen overflow-scroll"
      >
        <SubMenu key="sub1" title="Список криптовалют">
          {currencies.map(currency => (
            <Menu.Item key={currency.key}>{currency.label}</Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      <div className='mx-auto my-auto'>
        {currencyData ? <CryptocurrencyCard currency={currencyData} /> : <Spin size='large'/>}
      </div>
    </div>
  );
}

export default App;
