import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [participantes, setParticipantes] = useState([
    { id: 1, nome: 'GW come coco', pontos: 80 },
    { id: 2, nome: 'Pecinha love buzanel', pontos: 100 },
    { id: 3, nome: 'Vitao bonitao', pontos: 79 },
    { id: 4, nome: 'GW quebra costela', pontos: 67 },
  ])

  function adicionarParticipante(event) {
    event.preventDefault()

    if (nome.trim() === '') return

    const novoParticipante = {
      id: Date.now(),
      nome: nome.trim(),
      pontos: 0,
    }

    setParticipantes([...participantes, novoParticipante])
    setNome('')
  }

  function alterarPontos(id, quantidade) {

    setParticipantes(
      participantes.map((participante) =>
        participante.id === id
          ? {
            ...participante,
            pontos: Math.max(0, participante.pontos + quantidade),
          }
          : participante
      )
    )
  }

  function removerParticipante(id) {
    setParticipantes(
      participantes.filter((participante) => participante.id !== id)
    )
  }

  const ranking = [...participantes].sort(
    (a, b) => b.pontos - a.pontos || a.nome.localeCompare(b.nome)
  )

  return (
    <main className='container'>
      <header className='cabecalho'>
        <span className='subtitulo'>COMPETIÇÂO</span>
        <h1>Ranking Geral</h1>
        <p>Acompanhe a classificação dos participantes.</p>
      </header>

      <section className='cartao'>
        <h2>Adicionar participantes</h2>
        <form onSubmit={adicionarParticipante} className='formulario'> <input placeholder='Nome do participante' value={nome} onChange={(e) => setNome(e.target.value)} />
          <button>Adicionar</button>
        </form>
      </section>

      <section className="cartao">
        <h2>Classificação</h2>
        {ranking.map((p, i) => (
          <article className="participante" key={p.id}>
            <strong>{i + 1}º - {p.nome}</strong>
            <span>{p.pontos} pontos</span>
            <button onClick={() => alterarPontos(p.id, 10)}>+10</button>
            <button onClick={() => alterarPontos(p.id, -10)}>-10</button>
            <button onClick={() => removerParticipante(p.id)}>Excluir</button>
          </article>
        ))}
      </section>
    </main>

  )

}

export default App
