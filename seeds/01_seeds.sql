INSERT INTO users
  (name, email, password)
VALUES
  ('ali sayed', 'alisayed@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('mark thomas', 'markthomas@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('ahmedalwardani', 'ahmedalwardani@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES
  (1, 'Villa', 'Best out there!', 'https://q-cf.bstatic.com/images/hotel/max1024x768/163/163300408.jpg', 'https://q-cf.bstatic.com/images/hotel/max1024x768/163/163300408.jpg', 70, 3, 4, 6, 'Canada', '123 Longfields', 'Ottawa', 'Ontario', 'K9H6G8'),
  (2, 'House', 'Bueatiful house!', 'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale', 'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale', 80, 2, 3, 4, 'Canada', '246 Rideau', 'Ottawa', 'Ontario', 'J5H6G5'),
  (3, 'Palace', 'Check out this palace!', 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/y5i9zzgbkxsee2qygkk6/BuckinghamPalaceTickets.jpg', 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/y5i9zzgbkxsee2qygkk6/BuckinghamPalaceTickets.jpg', 90, 10, 10, 20, 'Canada', '738 Kanata', 'Ottawa', 'Ontario', 'D9H6GS3');


INSERT INTO reservations
  (start_date, end_date, property_id, guest_id)
VALUES
  ('2020-03-12', '2020-03-19', 3, 1),
  ('2020-02-19', '2020-03-11', 2, 3),
  ('2020-03-21', '2020-03-29', 1, 2);


INSERT INTO property_reviews
  (guest_id, property_id, reservation_id, rating, message
  )
VALUES
  (1, 3, 1, 5, 'excellent'),
  (3, 2, 2, 4, 'great'),
  (2, 1, 3, 5, 'cool');
