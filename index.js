const sequelize = require('./db');
const Car = require('./models/car');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к SQLite установлено.');

    await sequelize.sync({ force: true });
    console.log('Таблица cars синхронизирована.');

    await Car.bulkCreate([
      { brand: 'Toyota', model: 'Camry', year: 2020, price: 2500000, isAvailable: true },
      { brand: 'BMW', model: 'X5', year: 2019, price: 5500000, isAvailable: false },
      { brand: 'Lada', model: 'Vesta', year: 2022, price: 1200000, isAvailable: true },
    ]);
    console.log('Добавлены три записи об автомобилях.');

    const cars = await Car.findAll();
    console.log('\nСписок автомобилей:');
    cars.forEach((car) => {
      console.log(
        `- ${car.brand} ${car.model}, ${car.year} г., ${car.price} руб., доступен: ${car.isAvailable ? 'да' : 'нет'}`
      );
    });
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await sequelize.close();
    console.log('\nСоединение с базой данных закрыто.');
  }
}

main();
