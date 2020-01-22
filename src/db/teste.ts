import Endereco from './models/Endereco';
import { dbInit } from './db.service';
import Paciente from './models/Paciente';

// const endereco = Endereco.build({
//   logradouro: 'Rua Professor Mercedo Moreira',
//   numero: '404',
//   bairro: 'Itapoã',
//   cidade: 'Belo Horizonte',
//   estado: 'MG',
//   pais: 'Brasil',
//   cep: '31710-340',
// });

// dbInit().then(async () => {
//   console.log(endereco.toJSON());
//   await endereco.save();
//   console.log(endereco.toJSON());
// });

// const paciente = Paciente.build({
//   nome: 'Gabriel Carneiro',
//   cpf: '09392070608',
//   sexo: 'M',
//   nascimento: new Date(1997, 6, 19),
//   enderecoId: 1,
// });

// dbInit().then(async () => {
//   console.log(paciente.toJSON());
//   await paciente.save();
//   console.log(paciente.toJSON());
// });

dbInit().then(async () => {
  const p = await Paciente.findByPk(1);
  if (!p) return;

  const e = await p.getEndereco();
  if (!e) return;

  console.log(e.toJSON());
});
