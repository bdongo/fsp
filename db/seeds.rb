# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.delete_all
BusinessPage.delete_all
Review.delete_all


ua = User.create!(
        f_name: "John",
        l_name: "S",
        email:"j@j.com",
        username: "John",
        password: "123456"
)

# Generate random first and last names
first_names = ["Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn", "Abigail", "Emily", "Elizabeth", "Mila", "Ella", "Avery", "Sofia", "Camila", "Aria", "Scarlett", "Sarah"]
last_names = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Chen", "Lee", "Liu", "Wang", "Zhang", "Yang", "Qian", "Hu", "Guo", "Xie", "Lin", "Zheng", "Cheng", "Jiang"]

60.times do
  username = Faker::Internet.username(specifier: 5..10, separators: %w())
  while User.exists?(username: username)
    username = Faker::Internet.username(specifier: 5..10, separators: %w())
  end

  f_name = first_names.sample
  l_name = last_names.sample

  email = Faker::Internet.email(name: "#{f_name} #{l_name}", separators: '.')

  password = Faker::Internet.password(min_length: 6)

  User.create!(
    f_name: f_name,
    l_name: l_name,
    email: email,
    username: username,
    password: password,
  )
end


a = BusinessPage.create!({
    name: "McDonald's",
    hours: { 
            mon: "6:30 AM -10 PM", 
            tues: "6:30 AM -10 PM", 
            weds: "6:30 AM -10 PM", 
            thurs: "6:30 AM -10 PM",
            fri: "6:30 AM -10 PM",
            sat: "6:30 AM -10 PM",
            sun: "6:30 AM -10 PM" },
    about: "american fast food",
    phone_num: "(408) 554-0883",
    address: { 
            street: "5122 Stevens Creek Blvd",
            city: "San Jose",
            state: "CA"
            },
    pricing: 1,
    postal_code: "95129",
    location: { lat: -121.949574, lng: 37.322948 }}
)

b = BusinessPage.create!({
    name: "ABV",
    hours: { 
            mon: "4:00 PM - 2:00 AM (Next day)", 
            tues: "4:00 PM - 2:00 AM (Next day)", 
            weds: "4:00 PM - 2:00 AM (Next day)", 
            thurs: "4:00 PM - 2:00 AM (Next day)",
            fri: "4:00 PM - 2:00 AM (Next day)",
            sat: "4:00 PM - 2:00 AM (Next day)",
            sun: "4:00 PM - 2:00 AM (Next day)"},
    phone_num: "(415) 294-1871",
    pricing: 2,
    address: { 
            street: "3174 16th St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94103",
    location: { lat: 37.765551, lng: -122.422962 }}
)
# Cocktail Bars, American(New)

c = BusinessPage.create!({
    name: "Liholiho Yacht Club",
    hours: { 
            mon: "Closed", 
            tues: "5:00 PM - 9:00 PM", 
            weds: "5:00 PM - 9:00 PM",
            thurs: "5:00 PM - 9:00 PM",
            fri: "5:00 PM - 9:00 PM",
            sat: "5:00 PM - 9:00 PM",
            sun: "Closed"},
    phone_num: "http://lycsf.com/",
    pricing: 3,
    about: "Heritage driven food. Cooking and hospitality are the catalyst to gather and enjoy the moment.
Grind - Talk Story - Get Jag",
    address: { 
            street: "871 Sutter St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94109",
    location: { lat: -122.414087, lng: 37.788653 }}
)
# Cocktail Bars, American(New)

d = BusinessPage.create!({
    name: "Good Good Culture Club",
    hours: { 
            mon: "Closed", 
            tues: "5:00 PM - 9:00 PM", 
            weds: "5:00 PM - 9:00 PM",
            thurs: "5:00 PM - 9:00 PM",
            fri: "5:00 PM - 9:00 PM",
            sat: "5:00 PM - 9:00 PM",
            sun: "Closed"},
    phone_num: "http://lycsf.com/",
    pricing: 3,
    about: "We are a restaurant that deeply belives in celebrating heritage-driven food. We are AAPI-owned and
women-led. #getjag #didyoueatyet",
    address: { 
            street: "3560 18th St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94110",
    location: { lat: -122.422031, lng: 37.761258 }}
)
# Cocktail Bars, American(New)

e = BusinessPage.create!({
    name: "Brenda's French Soul Food",
    hours: { 
            mon: "8:00 AM - 8:00 PM", 
            tues: "8:00 AM - 8:00 PM", 
            weds: "8:00 AM - 8:00 PM",
            thurs: "8:00 AM - 8:00 PM",
            fri: "8:00 AM - 8:00 PM",
            sat: "8:00 AM - 8:00 PM",
            sun: "8:00 AM - 8:00 PM"
        },
    phone_num: "(415) 345-8100",
    pricing: 2,
    address: { 
            street: "652 Polk St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94102",
    location: { lat: -122.418939, lng: 37.784266 }}
)
# Breakfast & Brunch, Southern, Cajun/Creole

f = BusinessPage.create!({
    name: "AFICI",
    hours: { 
            mon: "Closed", 
            tues: "5:00 PM - 9:00 PM", 
            weds: "5:00 PM - 9:00 PM",
            thurs: "5:00 PM - 9:00 PM",
            fri: "5:00 PM - 9:00 PM",
            sat: "5:00 PM - 9:00 PM",
            sun: "Closed"
        },
    pricing: 3,
    phone_num: "(415) 537-1111",
    address: { 
            street: "680 Folsom St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94107",
    location:  {lat: -122.395116, lng: 37.785086}}
)
# American(Traditional)

g = BusinessPage.create!({
    name: "MoMo's",
    hours: { 
            mon: "11:30 AM - 9:30 PM", 
            tues: "11:30 AM - 9:30 PM", 
            weds: "11:30 AM - 9:30 PM",
            thurs: "11:30 AM - 10:00 PM",
            fri: "11:30 AM - 10:00 PM",
            sat: "11:30 AM - 9:30 PM",
            sun: "Closed"
        },
        about: "Our restaurant is located on the beautifully redeveloped South of Market waterfront and sits directly across the street from AT&T Park, home of the San Francisco Giants. We are one of San Francisco's premiere dining destinations with delicious food, attentive service and a dining room that is world class. Our outdoor dining decks are a San Francisco favorite.",
    phone_num: "(415) 227-8660",
    pricing: 3,
    address: { 
            street: "760 2nd St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94107",
    location:  {lat: -122.389886, lng: 37.781598}}
)

h = BusinessPage.create!({
    name: "Blind Butcher",
    hours: { 
            mon: "5:00 PM - 10:00 PM", 
            tues: "5:00 PM - 10:00 PM", 
            weds: "5:00 PM - 10:00 PM",
            thurs: "5:00 PM - 10:00 PM",
            fri: "5:00 PM - 11:00 PM",
            sat: "11:00 AM - 11:00 PM",
            sun: "11:00 AM - 11:00 PM"
        },
        phone_num: "(415) 529-2478",
    pricing: 3,
    address: { 
            street: "4058 18th St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94114",
    location:  {
  lat: 37.761869,
  lng: -122.435472
}}
)
# American(New), Wine Bars

i = BusinessPage.create!({
    name: "BrewVino, SF",
    hours: { 
            mon: "Closed", 
            tues: "12:00 PM - 9:00 PM", 
            weds: "12:00 PM - 9:00 PM",
            thurs: "12:00 PM - 9:00 PM",
            fri: "12:00 PM - 9:00 PM",
            sat: "12:00 PM - 9:00 PM",
            sun: "Closed"
        },
        phone_num: "(415) 834-5363",
        pricing: 3,
        about: "HAPPY HOUR has officially begun at BrewVino, SF! Join us for $5 pints, $10 glasses of wine and yummy snacks from 3:00pm - 5:00pm Monday - Friday​",
    address: { 
            street: "2706 24th St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94105",
    location:  {
  lat: 37.752297,
  lng: -122.407722
}}
)
# Pizza, Wine Bars, American(Traditional)

j = BusinessPage.create!({
    name: "Mili Wine Bar",
    hours: { 
            mon: "4:30 PM - 10:00 PM", 
            tues: "4:30 PM - 10:00 PM", 
            weds: "4:30 PM - 10:00 PM",
            thurs: "4:30 PM - 10:00 PM",
            fri: "4:30 PM - 10:00 PM",
            sat: "4:30 PM - 10:00 PM",
            sun: "Closed"
        },
        phone_num: "http://miliwinebar.com",
        pricing: 3,
    address: { 
            street: "110 Folsom St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94105",
    location:  {
  lat: 37.789266,
  lng: -122.389966
}}
)
# Wine Bar

j = BusinessPage.create!({
    name: "Swirl on Castro",
    hours: { 
            mon: "11:00 AM - 9:00 PM", 
            tues: "11:00 AM - 9:00 PM", 
            weds: "11:00 AM - 9:00 PM",
            thurs: "11:00 AM - 9:00 PM",
            fri: "11:00 AM - 9:00 PM",
            sat: "11:00 AM - 9:00 PM",
            sun: "11:00 AM - 9:00 PM"
        },
        phone_num: "(415) 864-2262",
        pricing: 3,
        about: "With 300 selections of wine, the team at Swirl have assembled a strong edit of international, eclectic wines that spotlight lesser-known grapes and regions from sustainable, family owned wineries. The lineup features selections from California, Spain, Argentina, France and Italy. Swirl on Castro features a great selection of Belgian style beers, as well as a strong selection of artisan spirits from around the world. The wine tasting bar is open nightly, with a selection of 20 wines by the taste.",
    address: { 
            street: "572 Castro St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94114",
    location:  {
  lat: 37.760207,
  lng: -122.434241
}}
)
# Wine Bar, wine and spirits

k = BusinessPage.create!({
    name: "Unwine'd SF",
    hours: { 
            mon: "Closed", 
            tues: "4:00 PM - 10:00 PM", 
            weds: "4:00 PM - 10:00 PM",
            thurs: "4:00 PM - 10:00 PM",
            fri: "4:00 PM - 10:00 PM",
            sat: "4:00 PM - 10:00 PM",
            sun: "4:00 PM - 10:00 PM"
        },
    phone_num: "(415) 702-6202",
    pricing: 3,
    address: { 
            street: "9 W Portal Ave",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94127",
    location:  {
  lat: 37.740401,
  lng: -122.468648
}}
)

# winebar

l = BusinessPage.create!({
    name: "Arcana",
    hours: { 
            mon: "Closed", 
            tues: "Closed", 
            weds: "4:00 PM - 12:00 AM (Next day)",
            thurs: "4:00 PM - 12:00 AM (Next day)",
            fri: "4:00 PM - 12:00 AM (Next day)",
            sat: "4:00 PM - 12:00 AM (Next day)",
            sun: "12:00 PM - 9:00 PM"
        },
    phone_num: "(415) 795-3842",
    pricing: 2,
    address: { 
            street: "2512 Mission St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94110",
    about: "An urban greenhouse, a shared 'living room' in the heart of Mission. At Arcana, magical mysteries come together to celebrate nature, culture, music and art from all over the world. Bar, Restaurant and Entertainment Serving global natural wines and plant-based food inspired by Middle Eastern cuisine. Join us for our live music and entertainment events every week. Design Consultation Helping you through every step of bringing lush plants to your home, office or small business. We work with individuals, interior designers and architects. Gallery and Showroom Step into Arcana during the day time hours for viewing of current exhibitions (By Appointment Only OR during store hours. You can also book a personal shopping appointment for our plant and planter collections.",
    location:  {
  lat: 37.756201,
  lng: -122.419918
}}
)
# winebar

m = BusinessPage.create!({
    name: "The Laundromat",
    hours: { 
            mon: "Closed", 
            tues: "Closed", 
            weds: "8:00 AM - 2:00 PM\n5:00 PM - 9:00 PM",
            thurs: "8:00 AM - 2:00 PM\n5:00 PM - 9:00 PM",
            fri: "8:00 AM - 2:00 PM\n5:00 PM - 10:00 PM",
            sat: "8:00 AM - 2:00 PM\n5:00 PM - 10:00 PM",
            sun: "9:00 AM - 2:00 PM\n5:00 PM - 8:00 PM"
        },
    phone_num: "(415) 379-4340",
    pricing: 3,
    address: { 
            street: "3725 Balboa St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94121",
    location:  {
  lat: 37.775928,
  lng: -122.499007
}}
)
# Pizza, Wine & Spirits

n = BusinessPage.create!({
    name: "InoVino",
    hours: { 
            mon: "Closed", 
            tues: "3:00 PM - 9:00 PM", 
            weds: "3:00 PM - 9:00 PM",
            thurs: "3:00 PM - 9:00 PM",
            fri: "3:00 PM - 9:00 PM",
            sat: "3:00 PM - 9:00 PM",
            sun: "3:00 PM - 9:00 PM"
        },
    phone_num: "(415) 681-3770",
    pricing: 3,
    address: { 
            street: "108B Carl St",
            city: "San Francisco",
            state: "CA"
            },
    about: "Rustic and seasonal Southern Tuscan menu prepared with local and organic ingredients. Small and large plates perfect for family-style dining. Classic pinsetta, pasta, seasonal salads, and a large selection of imported salumi and cheeses. Over 30 Italian wines by the taste, half glass, and full glass and more than 100 wines by the bottle featuring small production and producers. Our wine list focuses on volcanic soil and the sub-alpine regions of Italy. We specialize in biodynamic wines and indigenous varietals.",
    postal_code: "94117",
    location:  {
  lat: 37.765543,
  lng: -122.454189
}}
)
# italian, wine bar

o = BusinessPage.create!({
    name: "Bodega",
    hours: { 
            mon: "Closed", 
            tues: "4:00 PM - 11:00 PM", 
            weds: "4:00 PM - 11:00 PM",
            thurs: "4:00 PM - 11:00 PM",
            fri: "4:00 PM - 11:00 PM",
            sat: "4:00 PM - 11:00 PM",
            sun: "4:00 PM - 11:00 PM"
        },
    phone_num: "(415) 634-7002",
    pricing: 3,
    address: { 
            street: "700 Columbus Ave",
            city: "San Francisco",
            state: "CA"
            },
    about: "Wine. Beer. Food. Carefully Considered.",
    postal_code: "94133",
    location:  {
  lat: 37.801849,
  lng: -122.412808
}}
)
# wine bar , america(new)

p = BusinessPage.create!({
    name: "The Social Study",
    hours: { 
            mon: "5:30 PM - 10:00 PM", 
            tues: "1:00 PM - 10:00 PM", 
            weds: "1:00 PM - 10:00 PM",
            thurs: "1:00 PM - 10:00 PM",
            fri: "1:00 PM - 10:00 PM",
            sat: "1:00 PM - 10:00 PM",
            sun: "1:00 PM - 10:00 PM"
        },
    phone_num: "(415) 292-7417",
    pricing: 3,
    address: { 
            street: "1795 Geary Blvd",
            city: "San Francisco",
            state: "CA"
            },
    about: "Imported and domestic beer and wine. Signature wine, beer, and soju cocktails, bar snacks, movies,
and music. Happy hour specials M-F, 5-7PM!",
    postal_code: "94115",
    location:  {
  lat: 37.785023,
  lng: -122.428367
}}
)
# Wine bars , cafes

q = BusinessPage.create!({
    name: "Birba",
    hours: { 
            mon: "3:00 PM - 9:00 PM", 
            tues: "3:00 PM - 9:00 PM", 
            weds: "3:00 PM - 9:00 PM",
            thurs: "3:00 PM - 9:00 PM",
            fri: "3:00 PM - 9:00 PM",
            sat: "1:00 PM - 9:00 PM",
            sun: "1:00 PM - 8:00 PM"
        },
    phone_num: "(415) 549-7612",
    pricing: 3,
    address: { 
            street: "458 Grove St",
            city: "San Francisco",
            state: "CA"
            },
    about: "FOOD & WINE (like really cool wines from around the world)",
    postal_code: "94102",
    location:  {
  lat: 37.776432,
  lng: -122.425406
}}
)
# wine bars, american(new)

BusinessPage.create!({
    name: "Millay",
    hours: { 
            mon: "4:00 PM - 10:00 PM", 
            tues: "4:00 PM - 10:00 PM", 
            weds: "4:00 PM - 10:00 PM",
            thurs: "4:00 PM - 10:00 PM",
            fri: "4:00 PM - 10:00 PM",
            sat: "4:00 PM - 10:00 PM",
            sun: "2:00 PM - 8:00 PM"
        },
    phone_num: "https://www.millaysf.com",
    pricing: 3,
    address: { 
            street: "691 14th St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94114",
    location:  {
  lat: 37.767456,
  lng: -122.431496
}}
)
# wine bar

BusinessPage.create!({
    name: "Centro",
    hours: { 
            mon: "Closed", 
            tues: "4:00 PM - 9:00 PM", 
            weds: "4:00 PM - 9:00 PM",
            thurs: "4:00 PM - 9:00 PM",
            fri: "4:00 PM - 9:00 PM",
            sat: "4:00 PM - 9:00 PM",
            sun: "11:30 AM - 2:00 PM\n:00 PM - 9:00 PM"
        },
    phone_num: "(650) 513-6387",
    pricing: 2,
    address: { 
            street: "1326 Broadway",
            city: "Burlingame",
            state: "CA"
            },
    about: "Offering traditional Neapolitan pizza pies on the original downtown Burlingame; Grand Opening
soon!",
    postal_code: "94010",
    location:  {
  lat: 37.580606,
  lng: -122.346385
}}
)
# pizza

BusinessPage.create!({
    name: "Square Pie Guys",
    hours: { 
            mon: "11:30 AM - 9:00 PM", 
            tues: "11:30 AM - 9:00 PM", 
            weds: "11:30 AM - 9:00 PM",
            thurs: "11:30 AM - 9:00 PM",
            fri: "11:30 AM - 10:00 PM",
            sat: "11:30 AM - 10:00 PM",
            sun: "11:30 AM - 9:00 PM"
        },
    phone_num: "(415) 872-9290",
    pricing: 1,
    address: { 
            street: "1077 Mission St",
            city: "San Francisco",
            state: "CA"
            },
    about: "What makes Detroit Style Pizza (DSP) so unique? A crispy, crackly caramelized cheese crust that comes from baking in rectangular blue steel pans originally used to ferry auto parts around Detroit automotive factories. Marc Schechter, pizza obsessive, is proud to have found a home for the wildly popular pop up, Square Pie Guys.",
    postal_code: "94103",
    location:  {
  lat: 37.779777,
  lng: -122.411853
}}
)
# pizza

BusinessPage.create!({
    name: "Golden Boy Pizza",
    hours: { 
            mon: "11:30 AM - 9:00 PM", 
            tues: "11:30 AM - 9:00 PM", 
            weds: "11:30 AM - 9:00 PM",
            thurs: "11:30 AM - 9:00 PM",
            fri: "11:30 AM - 11:00 PM",
            sat: "11:30 AM - 11:00 PM",
            sun: "11:30 AM - 9:00 PM"
        },
    phone_num: "(415) 982-9738",
    pricing: 2,
    address: { 
            street: "542 Green St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94133",
    location:  {
  lat: 37.798263,
  lng: -122.408891
}}
)

# Pizza

BusinessPage.create!({
    name: "Tony's Pizza Napoletana",
    hours: { 
            mon: "12:00 PM - 9:00 PM", 
            tues: "12:00 PM - 9:00 PM", 
            weds: "12:00 PM - 10:00 PM",
            thurs: "12:00 PM - 10:00 PM",
            fri: "12:00 PM - 11:00 PM",
            sat: "12:00 PM - 11:00 PM",
            sun: "12:00 PM - 10:00 PM"
        },
    phone_num: "(415) 835-9888",
    pricing: 3,
    address: { 
            street: "1570 Stockton St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94133",
    location:  {
  lat: 37.801656,
  lng: -122.410825
}}
)
# pizza


BusinessPage.create!({
    name: "That's Amore Woodfire Pizza",
    hours: { 
            mon: "11:00 AM - 9:45 PM", 
            tues: "11:00 AM - 9:45 PM", 
            weds: "11:00 AM - 9:45 PM",
            thurs: "11:00 AM - 9:45 PM",
            fri: "11:00 AM - 9:45 PM",
            sat: "11:00 AM - 9:45 PM",
            sun: "11:00 AM - 9:45 PM"
        },
    phone_num: "(628) 529-0008",
    pricing: 2,
    address: { 
            street: "1901 Ocean Ave",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94127",
    location:  {
  lat: 37.732327,
  lng: -122.457026
}}
)

Review.create!(
  author_id: User.all.sample.id,
  business_id: BusinessPage.all.sample.id,
  rating: 4,
  body: "I had a really great experience at this business. The staff were very friendly and helpful, and the products they sell are of excellent quality. I would definitely recommend this business to anyone looking for a great shopping experience!"
)

Review.create!(
  author_id: User.all.sample.id,
  business_id: BusinessPage.all.sample.id,
  rating: 2,
  body: "I was really disappointed with my experience at this business. The staff were unfriendly and unhelpful, and the products they sell are of very poor quality. I would not recommend this business to anyone looking for a good shopping experience."
)

Review.create!(
  author_id: User.all.sample.id,
  business_id: BusinessPage.all.sample.id,
  rating: 5,
  body: "I had an absolutely amazing experience at this business! The staff were incredibly knowledgeable and helpful, and the products they sell are truly exceptional. I cannot recommend this business highly enough!"
)

Review.create!(
  author_id: User.all.sample.id,
  business_id: BusinessPage.all.sample.id,
  rating: 3,
  body: "My experience at this business was pretty average. The staff were friendly enough, but not particularly knowledgeable, and the products they sell are decent but not exceptional. If you're in the area and need something from this type of business, it's not a bad option, but I wouldn't go out of my way to shop here."
)

negative_reviews = [
  "Terrible experience! The food was horrible and the service was awful. Do not recommend!",
  "What a disappointing experience. The food was bad and the service was poor. Would not recommend.",
  "I had an awful time here. The food was terrible and the service was disappointing.",
  "The food was bad and the service was terrible. Would not recommend this place.",
  "This was a terrible experience. The food was awful and the service was bad. Do not recommend."
]

positive_reviews = [
  "I had an incredible experience at this place. The service was impeccable, and the food was absolutely amazing!",
  "The staff here were so friendly and welcoming! I felt right at home as soon as I walked in.",
  "I cannot recommend this place enough! Everything from the decor to the food was top-notch.",
  "What a hidden gem! I stumbled upon this place by accident and am so glad I did. The food was delicious, and the atmosphere was so cozy and inviting.",
  "This is hands down the best restaurant I've been to in ages. The menu is inventive, and the execution is flawless.",
  "I had an amazing time here. The drinks were great, the food was delicious, and the staff were incredibly attentive.",
  "I was blown away by the quality of the food here. Every dish was a work of art, and they tasted even better than they looked.",
  "What a fantastic experience! The food was exceptional, and the staff went above and beyond to make sure we were taken care of.",
  "I cannot speak highly enough of this place. The atmosphere is cozy and inviting, and the food is simply outstanding.",
  "This place is a true gem! The staff were incredibly friendly and knowledgeable, and the food was absolutely delicious.",
  "I had an incredible dining experience here. The food was simply divine, and the staff were so accommodating and friendly.",
  "I came here with high expectations, and they were exceeded in every way possible. The food was exceptional, and the service was top-notch.",
  "What an amazing meal! I loved every dish I tried, and the staff were so friendly and welcoming.",
  "I cannot recommend this place enough! The food was some of the best I've ever had, and the staff were so attentive and accommodating.",
  "This place is simply outstanding. The food is delicious, and the staff are incredibly knowledgeable and helpful.",
  "I had such a great time here. The atmosphere was cozy and inviting, and the food was absolutely delicious.",
  "The food here is out of this world! I loved every dish I tried, and the staff were so friendly and knowledgeable.",
  "What a fantastic dining experience! The food was incredible, and the staff were so friendly and attentive.",
  "I cannot say enough good things about this place. The food is exceptional, and the staff are so accommodating and friendly.",
  "This place is an absolute must-visit! The food is incredible, and the staff are so friendly and welcoming."
]

average_reviews = [
  "The food was decent, but nothing special.",
  "I had an okay experience here. Not bad, but not great either.",
  "Service was satisfactory, but nothing to write home about.",
  "The atmosphere was average and didn't leave much of an impression.",
  "My experience was pretty mediocre overall.",
  "Food was decent, but the service could have been better.",
  "Service was average, but the food was underwhelming.",
  "I would say it was just an average experience. Nothing too exciting.",
  "It was an average restaurant with average food and service.",
  "Overall, my experience was just okay.",
  "It wasn't terrible, but it wasn't amazing either. Just average.",
  "It was an unsatisfactory experience. I expected more.",
  "The food was lackluster and didn't have much flavor.",
  "Service was slow and not very attentive.",
  "The atmosphere was nothing special and could use some improvement.",
  "It was an average experience. Not bad, but not great either.",
  "I would say it was a satisfactory experience overall.",
  "I had a decent time, but it wasn't anything special.",
  "It was an underwhelming experience. I expected more.",
  "It was a lackluster experience that didn't leave much of an impression.",
  "The food was mediocre and nothing stood out.",
  "Service was average and didn't go above and beyond.",
  "It was an okay experience, but I probably wouldn't go back.",
  "The restaurant had an average atmosphere and wasn't very exciting.",
  "It was a satisfactory experience, but nothing too memorable."
]

