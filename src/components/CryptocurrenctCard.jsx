import React from 'react';
import { Card } from 'antd';

function CryptocurrencyCard(props) {
  const { currency } = props;
  const price = Math.round(currency.quote.USD.price)
  const priceChange1h = currency.quote.USD.percent_change_1h;

  return (
    <div>
      <Card
        title={
          <div className="flex items-center gap-3">
            <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt={`${currency.name} logo`} />
            <span>{currency.name}</span>
          </div>
        }
        bordered={false}
        style={{
          width: 900,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p>Символ: {currency.symbol}</p>
        <p>Текущая цена: {price}$</p>
        <p>Изменения цены за 24 часа: {priceChange1h}</p>
        <p>общее предложение: {currency.total_supply}</p>
        <p>SLUG: {currency.slug}</p>
      </Card>
    </div>
  );
}

export default CryptocurrencyCard;
