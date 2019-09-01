# Travelr Database

## Base URL
```https://travelr-be.herokuapp.com```

## GET
> List of endpoints for getting data related to objects and images

### ```GET /api/v1/objects```
> Get data on all objects   
Request: ```/api/v1/objects```  
**Example Response**
```
{
    "data": {
        "planets": [
            {
                "id": 6,
                "name": "Earth",
                "average_temp": "288 K",
                "perihelion": "147,095,000 km",
                "aphelion": "152,100,000 km",
                "diameter": "12,756 km",
                "gravity": "9.8 m/s²",
                "length_of_day": "24 hours",
                "number_of_moons": 1,
                "orbital_period": "365.2 days"
            },
            ...
        ],
        "moons": [
            {
                "id": 4,
                "name": "Moon",
                "average_temp": "235 K",
                "perihelion": "147,000,000 km",
                "aphelion": "152,000,000 km",
                "diameter": "3475 km",
                "gravity": "1.62 m/s²",
                "length_of_day": "708 hours",
                "number_of_moons": 0,
                "orbital_period": "27 days"
            },
            ...
        ],
        "stars": [
            {
                "id": 1,
                "name": "Sun",
                "average_temp": "5778 K",
                "perihelion": "0 km",
                "aphelion": "0 km",
                "diameter": "1392000 km",
                "gravity": "274.0 m/s²",
                "length_of_day": "587 hours",
                "number_of_moons": 0,
                "orbital_period": "225000000 years"
            },
            ...
        ],
        "bodies": [
            {
                "id": 15,
                "name": "Asteroid Belt",
                "average_temp": "185 K",
                "perihelion": "314,200,000 km",
                "aphelion": "613,400,000 km",
                "diameter": "0 km",
                "gravity": "0.0 m/s²",
                "length_of_day": "0 hours",
                "number_of_moons": 0,
                "orbital_period": "2,000 days"
            },
            ...
        ]
    }
}
```

### ```GET /api/v1/objects/:id/images``
> Get data on all images for an associated object    
Request: ```/api/v1/objects/6/images```  
**Example Response**
```
[
    {
        "id": 1,
        "image_id": "GSFC_20171208_Archive_e001150",
        "image_name": "Earth",
        "object_id": 6,
    },
    {
        "id": 2,
        "image_id": "iss042e013697",
        "image_name": "Earth",
        "object_id": 6,
    },
    {
        "id": 3,
        "image_id": "iss036e022303",
        "image_name": "Earth",
        "object_id": 6,
    },
    {
        "id": 4,
        "image_id": "iss040e019206",
        "image_name": "Earth",
        "object_id": 6,
    }
]
```