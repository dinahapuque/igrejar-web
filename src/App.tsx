import { useState } from 'react';
import Directory from './Directory';
import './App.css';

// Fill in when the app is published: https://play.google.com/store/apps/details?id=com.dinamoura.igrejar
const PLAY_STORE_URL = '';
const CONTACT_EMAIL = 'dina.hapuque@gmail.com';

const FEATURES = [
  {
    title: 'Encontre no mapa',
    text: 'Veja as igrejas batistas regulares perto de você, com a distância até cada uma e o botão para abrir a rota no aplicativo de mapas.',
  },
  {
    title: 'Programação e pastores',
    text: 'Consulte endereço, dias e horários dos cultos e quem são os pastores de cada igreja.',
  },
  {
    title: 'Favoritos e devocionais',
    text: 'Salve as igrejas que importam para você e leia um devocional por dia. Tudo fica no seu celular, sem cadastro.',
  },
];

function App() {
  const [showDirectory, setShowDirectory] = useState(false);

  return (
    <>
      <header className="hero">
        <div className="wrap hero-inner">
          <img
            className="hero-icon"
            src={`${import.meta.env.BASE_URL}icon-512.png`}
            width={112}
            height={112}
            alt="Ícone do Igrejar: uma seta de navegação com uma cruz"
          />
          <h1>Igrejar</h1>
          <p className="hero-tagline">
            Encontre uma igreja batista regular perto de você.
          </p>
          <div className="hero-actions">
            {PLAY_STORE_URL ? (
              <a className="button primary" href={PLAY_STORE_URL}>
                Baixar na Google Play
              </a>
            ) : (
              <span className="button primary disabled" aria-disabled="true">
                Em breve na Google Play
              </span>
            )}
            <a className="button secondary" href="#igrejas">
              Ver as igrejas
            </a>
          </div>
          <p className="hero-note">Gratuito. Sem cadastro.</p>
        </div>
      </header>

      <main>
        <section className="wrap features" aria-labelledby="como-funciona">
          <h2 id="como-funciona">O que o Igrejar faz</h2>
          <ul className="feature-grid">
            {FEATURES.map(feature => (
              <li key={feature.title} className="feature">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="wrap directory" id="igrejas" aria-labelledby="lista">
          <h2 id="lista">Igrejas e devocionais</h2>
          <p className="muted">
            Uma amostra do que o aplicativo traz, para consultar pelo navegador.
          </p>
          {showDirectory ? (
            <Directory />
          ) : (
            <button
              className="button secondary solid"
              onClick={() => setShowDirectory(true)}
            >
              Mostrar igrejas e devocionais
            </button>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <p>
            O Igrejar é um projeto independente e{' '}
            <strong>não é um aplicativo oficial</strong> de nenhuma associação
            ou denominação. As informações das igrejas vêm de fontes públicas,
            como os sites das associações, e podem conter erros.
          </p>
          <p>
            Se você é pastor ou responsável por uma igreja e quer corrigir ou
            remover alguma informação, escreva para{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <nav className="footer-links" aria-label="Links do rodapé">
            <a href={`${import.meta.env.BASE_URL}privacidade/`}>
              Política de Privacidade
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`}>Contato</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default App;
