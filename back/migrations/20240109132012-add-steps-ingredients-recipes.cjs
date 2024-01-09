'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Recipes', 'ingredients', {
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn('Recipes', 'steps', {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Recipes', 'ingredients'),
      queryInterface.removeColumn('Recipes', 'steps'),
    ]);
  },
};