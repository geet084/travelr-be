const express = require('express');
const app = express();
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(express.json());

app.get('/api/v1/objects', (req, res) => {
  database('objects').select()
    .then(objects => {
      let data = { planets: [], moons: [], stars: [], bodies: [] }
      objects.sort((a, b) => a.id - b.id)

      Object.keys(data).forEach(key => {
        let objKey = key === 'bodies' ? 'body' : key.slice(0, key.length - 1)
        let info = objects.filter(obj => obj[objKey])
        data[key] = removeServerInfo(info)
      })

      res.status(200).json({ data });
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

app.get('/api/v1/objects/:id/images', (req, res) => {
  const { id } = req.params;

  database('images').where('object_id', id).select()
    .then(images => {
      if (images[0]) {
        res.status(200).json(images)
      } else {
        res.status(404).json(`No images associated with this object!`)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

app.get('/api/v1/images', (req, res) => {
  database('images').select()
    .then(images => {
      res.status(200).json(images);
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

app.post('/api/v1/images', (req, res) => {

  req.body.forEach((obj, i) => {

    const params = ['name', 'imageId']
    for (let reqParam of params) {
      if (!obj[reqParam]) {
        return res.status(422).send({
          error: `Object ${i + 1} ::: Expected format: { name: <String>, imageId: <String> }. You're missing a "${reqParam}" property!`
        })
      }
    }

    let imageName = parseObjName(obj.name);

    database('objects').where('name', imageName).select()
      .then(foundObj => {
        if (foundObj.length) {
          database('images').where('image_name', imageName).insert({
            image_name: imageName,
            image_id: obj.imageId,
            object_id: foundObj[0].id
          }, 'id')
            .then(images => {
              if (images.length) res.status(200).json({ id: images[0], ...obj })
              else res.status(500).json('some error...')
            })
        } else return res.status(404).json(`Object name "${obj.name}" not in database, POST unsuccessful`)
      })
  });
})

module.exports = app;

function removeServerInfo(objects) {
  let serverKeys = ['body', 'moon', 'planet', 'star', 'created_at', 'updated_at'];

  return objects.map(obj => {
    let cleanedObj = {};
    
    Object.keys(obj).forEach(key => {
      if (!serverKeys.includes(key)) cleanedObj[key] = obj[key]
    });
    return cleanedObj;
  });
}

function parseObjName(word) {
  return word.trim().split(' ').map(word => {
    let firstChar = word.split('').shift().toUpperCase();
    let restOfWord = word.slice(1, word.length).toLowerCase();
    return firstChar + restOfWord;
  }).join(' ');
}