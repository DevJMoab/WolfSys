import React from 'react';
import Card from '../components/Card';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Card title="Total de Clientes" value="1,234" icon="👥" />
      <Card title="Pedidos Este Mês" value="567" icon="📦" />
      <Card title="Receita Total" value="R$ 89,000" icon="💰" />
    </div>
  );
};

export default Dashboard;