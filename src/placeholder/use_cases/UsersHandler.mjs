import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

const handleUserCreated = (user) => {
  console.log('Novo usuário criado:', user);
};
eventEmitter.on('userCreated', handleUserCreated);

export default handleUserCreated;
