import eventoEmitter from '../events/EventEmitter.mjs';
import RepositoryImpl from '../../infra/repository/index.mjs'
import UserRepository from '../placeholder/repositories/userRespository.mjs'

const Repository = new UserRepository(RepositoryImpl)


eventoEmitter.on('meuEvento',(newUser) => {
  Repository.save(newUser);
  console.log('Evento "meuEvento" ouvido:', newUser);
});

