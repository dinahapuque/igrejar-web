import { useEffect, useState } from 'react';
import type { ChurchType, DevotionalType } from './types';

type Tab = 'devotionals' | 'churches';

// Loaded only when the visitor opens it, so the landing page stays light.
function Directory() {
  const [tab, setTab] = useState<Tab>('churches');
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
    <div>
      <div className="tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'churches'}
          className={tab === 'churches' ? 'tab active' : 'tab'}
          onClick={() => setTab('churches')}
        >
          Igrejas ({churches.length})
        </button>
        <button
          role="tab"
          aria-selected={tab === 'devotionals'}
          className={tab === 'devotionals' ? 'tab active' : 'tab'}
          onClick={() => setTab('devotionals')}
        >
          Devocionais
        </button>
      </div>

      {loading && <p className="status">Carregando...</p>}

      {!loading && tab === 'devotionals' && (
        <section className="list">
          {devotionals.map(devotional => (
            <article key={devotional.id} className="card">
              <div className="card-meta">
                <span>{devotional.verse}</span>
                <span>{devotional.date}</span>
              </div>
              <h3>{devotional.title}</h3>
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
            aria-label="Buscar igreja por nome, cidade ou estado"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="list">
            {filteredChurches.map(church => (
              <article key={church.id} className="card">
                <h3>
                  {church.name}
                  {church.verified && (
                    <span className="verified" title="Endereço verificado">
                      {' '}
                      ✓ Endereço verificado
                    </span>
                  )}
                </h3>
                <p>
                  {church.address}
                  {church.number && church.number !== 'Sem número'
                    ? `, ${church.number}`
                    : ''}
                  {' — '}
                  {church.city} - {church.state}
                </p>
                {church.associations.length > 0 && (
                  <p className="tags">
                    {church.associations.map(association => (
                      <span key={association} className="tag">
                        {association}
                      </span>
                    ))}
                  </p>
                )}
                {church.pastors.length > 0 && (
                  <p className="muted small">
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

export default Directory;
