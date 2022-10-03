

const greeter = () => {
  return {
    message: (() => {
      const name = 'Naveed';
      const greeting = 'Hello';

      return `${greeting} ${name}!`;
    })(),

    sayGreetings() {
      console.log(this.message);
    }
  };
};