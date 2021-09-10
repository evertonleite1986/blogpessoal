import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

// '/posts'
const caminhoDoDiretorio = path.join(process.cwd(), 'posts');

// listar na tela inicial todos os posts que existem
export function pegarPostsPorData() {

  // pegar o nome de todos os arquivos na pasta /posts
  // essa variável fica assim ['post01.md', post02.md', 'post03.md']
  const nomeDosArquivos = fs.readdirSync(caminhoDoDiretorio);

  // -----------------------------------------------------
  // retorna [{id: 'post01', data}, {}, {}]
  const dadosDosPost = nomeDosArquivos.map( arquivo => {

    // cria um id com o nome do arquivo sem o .md
    const id = arquivo.replace(/\.md$/, '');

    // cria uma variável com o caminho do post ex: '/posts/post01.md'
    const caminhoDeCadaPost = path.join(caminhoDoDiretorio, arquivo)

    // pega o conteúdo de um arquivo
    const conteudoDoArquivo = fs.readFileSync(caminhoDeCadaPost, 'utf-8')

    //mapear o conteúdo do arquivo
    const formatadorMatter = matter(conteudoDoArquivo)

    return {
      id, ...formatadorMatter.data
    }
  })

  return dadosDosPost.sort( (a, b) => {

    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })

}

// -----------------------------------------------

export function pegarTodosOsIds() {
  const nomeDosArquivos = fs.readdirSync(caminhoDoDiretorio)
  return nomeDosArquivos.map( arquivo => {
    return {
      params: {
        id: arquivo.replace(/\.md$/, '')
      }
    }
  })
}

// Pegar o conteúdo de cada post e transformar em HTML
// vai retornar para nós um id, um conteúdo em HTML
export async function pegarDadosDoPost(id) {

  const caminhoDoArquivo = path.join(caminhoDoDiretorio, `${id}.md`)

  const conteudoDoArquivo = fs.readFileSync(caminhoDoArquivo, 'utf8')

  const formatadorMatter = matter(conteudoDoArquivo)

  const conteudoProcessado = await remark()
    .use(html)
    .process(formatadorMatter.content)

  const conteudoHtml = conteudoProcessado.toString();

  return {
    id,
    conteudoHtml,
    ...formatadorMatter.data
  }
}