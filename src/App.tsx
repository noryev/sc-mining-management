import React from 'react';
import { Input, Button, List, Typography, Card, InputNumber, Form } from 'antd';
import { useDocument, useLiveQuery } from 'use-fireproof';

const { Title, Text } = Typography;
const { Item } = List;

const App = () => {
  const hauls = useLiveQuery('date', { limit: 10 });
  const [newHaul, setNewHaul, saveNewHaul] = useDocument({ date: '', ore: '', quantity: 0, value: 0, location: '' });

  return (
    <div style={{ minHeight: '100vh', padding: '3rem', backgroundColor: '#f7fafc' }}>
      <Title level={2} style={{ textAlign: 'center', color: '#2a4365', marginBottom: '1rem' }}>
        🌌 Star Citizen Mining Hauls Tracker ⛏️
      </Title>
      <Card style={{ marginTop: '1rem' }}>
        <Form layout="vertical">
          <Form.Item label="Date">
            <Input type="date" value={newHaul.date} onChange={(e) => setNewHaul({ ...newHaul, date: e.target.value })} />
          </Form.Item>
          <Form.Item label="Ore">
            <Input value={newHaul.ore} onChange={(e) => setNewHaul({ ...newHaul, ore: e.target.value })} />
          </Form.Item>
          <Form.Item label="Quantity">
            <InputNumber value={newHaul.quantity} onChange={(value) => setNewHaul({ ...newHaul, quantity: value })} />
          </Form.Item>
          <Form.Item label="Value">
            <InputNumber value={newHaul.value} onChange={(value) => setNewHaul({ ...newHaul, value: value })} />
          </Form.Item>
          <Form.Item label="Location">
            <Input value={newHaul.location} onChange={(e) => setNewHaul({ ...newHaul, location: e.target.value })} />
          </Form.Item>
          <Button
            type="primary"
            onClick={() => {
              saveNewHaul();
              setNewHaul({ date: '', ore: '', quantity: 0, value: 0, location: '' });
            }}
          >
            Add Haul
          </Button>
        </Form>
      </Card>
      <div style={{ marginTop: '2rem' }}>
        <Title level={3}>Mining Hauls</Title>
        <List
          bordered
          dataSource={hauls.docs}
          renderItem={(haul) => (
            <Item key={haul._id}>
              <pre style={{ overflowX: 'auto' }}>{JSON.stringify(haul, null, 2)}</pre>
            </Item>
          )}
        />
      </div>
    </div>
  );
};

export default App;
