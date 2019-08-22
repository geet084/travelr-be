const objectsData = require('../../../data/data');

const createImage = (knex, image) => {
  return knex('images').insert(image)
};

const createObject = (knex, object) => {
  return knex('objects').insert({
    name: object.name,

    average_temp: object.average_temp,
    perihelion: object.perihelion,
    aphelion: object.aphelion,
    diameter: object.diameter,
    gravity: object.gravity,
    length_of_day: object.length_of_day,
    number_of_moons: object.number_of_moons,
    moon: object.moon,
    orbital_period: object.orbital_period,
    planet: object.planet,
    star: object.star,
    body: object.body,
  }, 'id')
    .then(objectId => {
      let imagesPromises = [];
      object.images.forEach(image => {
        imagesPromises.push(
          createImage(knex, {
            image_id: image,
            image_name: object.name,
            object_id: objectId[0]
          })
        )
      })
      return Promise.all(imagesPromises)
    })
}

exports.seed = (knex) => {
  return knex('images').del()
    .then(() => knex('objects').del())
    .then(() => {
      let objectPromises = [];
      objectsData.forEach(object => {
        objectPromises.push(createObject(knex, object))
      })
      return Promise.all(objectPromises);
    })
    .catch(error => console.log(`Error seeding data ${error}`));
};