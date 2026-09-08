import { useEffect, useState } from 'react';
import type { ChurchType, DevotionalType } from './types';
import './App.css';

type Tab = 'devotionals' | 'churches';

function App() {
  const [tab, setTab] = useState<Tab>('devotionals');
  const [devotionals, setDevotionals] = useState<DevotionalType[]>([]);
  const [churches, setChurches] = useState<ChurchType[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    Promise.all([
      fetch(`${base}data/devotionals.json`).then(r => r.json()),
      fetch(`${base}data/churches.json`).then(r => r.json()),
    ])
      .then(([devotionalsData, churchesData]) => {
        setDevotionals(devotionalsData);
        setChurches(churchesData);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredChurches = churches.filter(church => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    return (
      church.name.toLowerCase().includes(query) ||
      church.city.toLowerCase().includes(query) ||
      church.state.toLowerCase().includes(query)
    );
  });

  return (
    <div className="page">
      <header className="header">
        <h1>Igrejar</h1>
        <p>Devocionais e igrejas cadastradas</p>
      </header>

      <nav className="tabs">
        <button
          className={tab === 'devotionals' ? 'tab active' : 'tab'}
          onClick={() => setTab('devotionals')}
        >
          Devocionais
        </button>
        <button
          className={tab === 'churches' ? 'tab active' : 'tab'}
          onClick={() => setTab('churches')}
        >
          Igrejas ({churches.length})
        </button>
      </nav>

      {loading && <p className="status">Carregando...</p>}

      {!loading && tab === 'devotionals' && (
        <section className="list">
          {devotionals.map(devotional => (
            <article key={devotional.id} className="card">
              <div className="card-meta">
                <span>{devotional.verse}</span>
                <span>{devotional.date}</span>
              </div>
              <h2>{devotional.title}</h2>
              <p className="content">{devotional.content}</p>
            </article>
          ))}
        </section>
      )}

      {!loading && tab === 'churches' && (
        <section>
          <input
            className="search"
            placeholder="Buscar por nome, cidade ou estado..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="list">
            {filteredChurches.map(church => (
              <article key={church.id} className="card">
                <h2>{church.name}</h2>
                <p>
                  {church.address}
                  {church.number && church.number !== 'Sem número'
                    ? `, ${church.number}`
                    : ''}
                  {' — '}
                  {church.city} - {church.state}
                </p>
                {church.pastors.length > 0 && (
                  <p className="pastors">
                    Pastor(es): {church.pastors.map(p => p.name).join(', ')}
                  </p>
                )}
              </article>
            ))}
            {filteredChurches.length === 0 && (
              <p className="status">Nenhuma igreja encontrada.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
