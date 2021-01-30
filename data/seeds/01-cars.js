
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: "5N1AR18U05C785337", Make: "Tesla", Model: "Model S", Mileage: 20000, TitleStatus: "Clean"},
        {VIN: "1G4HD57217U188568", Make: "Tesla", Model: "Model 3", Mileage: 500},
        {VIN: "5FNYF4H24DB083583", Make: "Tesla", Model: "Model X", Mileage: 100000},
        {VIN: "SAJKX6040XC835195", Make: "Tesla", Model: "Model Y", Mileage: 5000, TitleStatus: "Salvage"}
      ]);
    });
};
