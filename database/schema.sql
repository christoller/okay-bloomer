DROP TABLE IF EXISTS user_plant_schedule;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS user_plant_favourites;


CREATE TYPE sunlight_types AS ENUM ('full sun', 'partial', 'full shade'); 
CREATE TYPE location_types AS ENUM ('outdoor', 'indoor', 'both');

CREATE TABLE plants (
  id SERIAL PRIMARY KEY,
  name varchar(40) not null,
  latin_name varchar(40) not null,
  description text not null, 
  watering_frequency_in_days smallint not null,
  sunlight sunlight_types not null,
  image_url text not null,
  plant_location location_types not null,
  fertilising_frequency_in_days smallint,
  pruning_frequency_in_days smallint,
  repotting_frequency_in_days smallint,
  soil_type text
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(30) not null unique,
  password varchar(255) not null,
  email varchar(255) not null unique
);

CREATE TABLE user_plant_schedule (
  id SERIAL PRIMARY KEY,
  user_id integer not null,
  plant_id integer not null,
  plant_nickname varchar(50),
  last_watering_date timestamptz not null,
  last_fertilising_date timestamptz not null,
  last_repotting_date timestamptz not null,
  last_pruning_date timestamptz not null,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_plant FOREIGN KEY(plant_id) REFERENCES plants(id)
);

CREATE TABLE user_plant_favourites (
  id SERIAL PRIMARY KEY,
  user_id integer not null,
  plant_id integer not null,
  CONSTRAINT fk_plant FOREIGN KEY(plant_id) REFERENCES plants(id),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);
