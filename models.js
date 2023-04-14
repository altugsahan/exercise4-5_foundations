const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const Workout = sequelize.define('workout', {
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
});

const Exercise = sequelize.define('exercise', {
  sets: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  reps: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Exercise.belongsTo(Workout);
Workout.hasMany(Exercise);

module.exports = {
  sequelize,
  Workout,
  Exercise
};
