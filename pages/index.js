import Layout from '../components/Layout.js'
import Link from 'next/link'

export default function Home({ pokemon }) {
  return (
    <div>
      <Layout>
        <h1 className='text-4xl mb-8 text-center'>
          pokedex
        </h1>
        <ul>
          {pokemon.map((pokeman, index) => (
            <li key={index}>
              <Link href={`/pokemon?id=${index + 1}`}>
                <a className='border p4 border-gray my-2 flex items-center bg-gray-200 text-lg rounded-md'>
                  <img src={pokeman.image} alt={pokeman.name} />
                  <h2><span className='text-bold'>{index + 1}.</span> {pokeman.name.toUpperCase()}</h2>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </div>
  )
}

export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const { results } = await res.json()

    const pokemon = results.map((pokeman, index) => {
      const paddedId = ('00' + (index + 1)).slice(-3)
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`
      return { ...pokeman, image }
    })

    return {
      props: { pokemon },
    }
  } catch (err) {
    console.error(err)
  }
}