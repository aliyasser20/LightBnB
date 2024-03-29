const properties = require("./json/properties.json");
const users = require("./json/users.json");

const { queryExecute } = require("./db/index");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const variables = [email];
  const query = `
  SELECT * FROM users WHERE email = $1
  `;

  return queryExecute(query, variables, (rows) => rows[0] || null);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const variables = [id];
  const query = `
  SELECT * FROM users WHERE id = $1
  `;

  return queryExecute(query, variables, (rows) => rows[0] || null);
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const variables = [user.name, user.email, user.password];
  const query = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  
  return queryExecute(query, variables, (rows) => rows);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const variables = [guest_id, limit];
  const query = `
  SELECT reservations.*, properties.*, avg(property_reviews.rating) AS average_rating
  FROM reservations JOIN properties ON properties.id = reservations.property_id
    JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.end_date < (now()
  ::date) AND reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date 
  limit $2;`;

  return queryExecute(query, variables, (rows) => rows);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (Object.keys(options).length > 0) {
    queryString += "WHERE ";
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryParams.indexOf(options.owner_id) > 0 ? queryString += " AND " : null;
    queryString += `properties.owner_id = $${queryParams.length} `;
  }
  
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryParams.indexOf(options.minimum_price_per_night * 100) > 0 ? queryString += " AND " : null;
    queryString += `properties.cost_per_night >= $${queryParams.length} `;
  }
  
  if (options.maximum_price_per_night) {
    queryParams.push((options.maximum_price_per_night * 100));
    queryParams.indexOf(options.maximum_price_per_night * 100) > 0 ? queryString += " AND " : null;
    queryString += `properties.cost_per_night <= $${queryParams.length} `;
  }
  
  queryString += `
  GROUP BY properties.id
  `;
  
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }
  
  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  // console.log(queryString, queryParams);

  // 6
  return queryExecute(queryString, queryParams, (rows) => rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const variables = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night * 100, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms];
  const query = `
  INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;

  return queryExecute(query, variables, (rows) => rows);
};
exports.addProperty = addProperty;
