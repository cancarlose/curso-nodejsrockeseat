// Criação de Stream
import { Readable, Writable, Transform } from 'node:stream'

class OnetoHundredStream extends Readable {
  index = 1

  // Método Obrigatório
  _read() {
    const i = this.index++

    setTimeout(() => { // Delimitar um tempo para o processo ser completado
      if (i > 100){
        this.push(null) // null por não ter mais informações para enviar
      } else {
        const buf = Buffer.from(String(i)) // Tipagem buffer, pois não usa-se formato primitivo. Buffer não aceita números, então transforme em string
  
        this.push(buf)
      }
    }, 1000)
  }
}

class InverseNumber extends Transform {
  // Método Obrigatório
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplybyTenStream extends Writable {
  // Método Obrigatório

  // Chunk - Pedaço da leitura, o que está sendo enviado
  // Enconding - É como a informação está codificada
  // Callback - Função que precisa ser chamada quando ela terminou o que precisava fazer com a informação
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OnetoHundredStream()
  .pipe(new InverseNumber)
  .pipe(new MultiplybyTenStream)
// Método pipe() tem como função, emcaminhar uma informação