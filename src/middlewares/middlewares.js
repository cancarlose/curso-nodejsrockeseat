export async function json(req, res) {
  const buffers = []

  for await(const chunk of req) {
    buffers.push(chunk)
  } // ler uma stream por completo 

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  } // transformando em tipo primitivo JS

  res.setHeader('Content-type', 'application/json') // Criação do cabeçalho. Serve para melhor compreensão do front e back
}