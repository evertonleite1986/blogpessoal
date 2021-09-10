import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/layout.module.css';
import { pegarPostsPorData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export default function Home({ dadosDosPosts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <section>
        <p>Olá, como está escrito acima, me chamo Everton Vieira Leite, tenho 34 anos sou casado e tenho uma filha.</p>
        <p>Estou concluindo o curso de Gestão da Tecnologia da Informação, e sou estudante de Desenvolvimento Front-End na BlueEdTech.</p>
        <p>Sou apaixonado por tecnologia, e também adoro esportes (apesar de não estar conseguindo praticá-los com frequência).</p>
        <p>Neste Blog, irei compartilhar um pouco do meu dia a dia atual, porém, irei postar algumas experiências que tive também em algum momento da minha vida, e possivelmente poderei colocar algumas datas que podem não ser exatas, mas as colocarei conforme minhas recordações. Caso em alguma dessas postagens antigas algum amigo venha a recordar, e até mesmo contestar a data e a veracidade dos fatos postados (afinal, toda história tem três lados, o lado de quem conta, o lado da outra pessoa que conta, e a verdade...), é só clicar em <strong>Contestar postagem</strong>, lá embaixo, e me mandar um e-mail pra lembrarmos juntos o que aconteceu... </p>
        <p>Espero que curtam o conteúdo, grande abraço!!</p>
      </section>

      <section>
        <h2>Blog</h2>
        <ul>
          {
            dadosDosPosts.map( ({id, date, title}) => (
              <li key={id}>
                <Link href={`/posts/${id}`}>
                  {title}
                </Link>
                <small>
                  <Date dateString={date}/>
                </small>
              </li>
            ))
          }
        </ul>
      </section>
      <a className="link_mail" href="mailto:everton_leite25@hotmail.com?subject='Contestação de postagem do Blog'">Contestar postagem</a>
    </Layout>
  )
}

export async function getStaticProps() {
  const dadosDosPosts = pegarPostsPorData();
  return {
    props: {
      dadosDosPosts
    }
  }
}