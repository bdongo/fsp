# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"


puts "destroying tables"

BusinessTag.destroy_all
Tag.destroy_all
Review.destroy_all
User.destroy_all
BusinessPage.destroy_all




ua = User.create!(
        f_name: "John",
        l_name: "S",
        email:"j@j.com",
        username: "John",
        password: "123456"
)

# Generate random first and last names
first_names = ["Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn", "Abigail", "Emily", "Elizabeth", "Mila", "Ella", "Avery", "Sofia", "Camila", "Aria", "Scarlett", "Sarah", "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Lucas", "Henry", "Alexander", "Michael", "Ethan", "Daniel", "Matthew", "Elijah", "Oliver", "Jacob", "Levi", "Samuel", "David", "Sebastian", "Joseph"]
last_names = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Chen", "Lee", "Liu", "Wang", "Zhang", "Yang", "Qian", "Hu", "Guo", "Xie", "Lin", "Zheng", "Cheng", "Jiang"]

45.times do
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

puts "users created"

def attach_photos(biz, photo_url_arr) 
  photo_url_arr.each do |url|
    photo = URI.open(url)
    name = url.split("/").last
    biz.photos.attach(
      io: photo,
      filename: name
    )
  end
end

puts "creating tags"

fastf = Tag.create!({tag_name: "Fast Food"})
american_n = Tag.create!({tag_name: "American(New)"})
cocktail = Tag.create!({tag_name: "Cocktail Bars"})
b_b = Tag.create!({tag_name: "Breakfast & Brunch"})
southern = Tag.create!({tag_name: "Southern"})
cajun = Tag.create!({tag_name: "Cajun/Creole"})
american_t = Tag.create!({tag_name: "American(Traditional)"})
wine = Tag.create!({tag_name: "Wine Bar"})
pizza = Tag.create!({tag_name: "Pizza"})
w_spirits = Tag.create!({tag_name: "Wine and Spirits"})
italian = Tag.create!({tag_name: "Italian"})
cafe = Tag.create!({tag_name: "Cafes"})

puts "creating businesses"
 
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
a_arr = ["https://ylp-seeds.s3.us-west-1.amazonaws.com/mcdonald.jpeg",
   "https://ylp-seeds.s3.us-west-1.amazonaws.com/mcdonald1.jpeg"]
attach_photos(a, a_arr)

BusinessTag.create!({business_id: a.id , tag_id: fastf.id})


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

BusinessTag.create!({business_id: b.id , tag_id: american_n.id})
BusinessTag.create!({business_id: b.id , tag_id: cocktail.id})


b_arr = ["https://ylp-seeds.s3.us-west-1.amazonaws.com/abv.jpeg",
   "https://ylp-seeds.s3.us-west-1.amazonaws.com/abv2.jpeg",
   "https://ylp-seeds.s3.us-west-1.amazonaws.com/abv3.jpeg",
   "https://ylp-seeds.s3.us-west-1.amazonaws.com/abv4.jpeg"
  ]

attach_photos(b, b_arr)


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

BusinessTag.create!({business_id: c.id , tag_id: american_n.id})
BusinessTag.create!({business_id: c.id , tag_id: cocktail.id})

c_arr = [
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/liho.png",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/liho1.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/liho2.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/liho3.jpeg"
]
 attach_photos(c, c_arr)



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

BusinessTag.create!({business_id: d.id , tag_id: american_n.id})
BusinessTag.create!({business_id: d.id , tag_id: cocktail.id})


d_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/good.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/good1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/good2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/good3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/good4.jpeg"
]
attach_photos(d, d_arr)

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
    website: "http://frenchsoulfood.com",
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

BusinessTag.create!({business_id: e.id , tag_id:  b_b.id})
BusinessTag.create!({business_id: e.id , tag_id: southern.id})
BusinessTag.create!({business_id: e.id , tag_id: cajun.id})



e_arr = [
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/brendas+3.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/brendas.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/brendas1.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/brendas4.jpeg"
]

attach_photos(e, e_arr)


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

BusinessTag.create!({business_id: f.id , tag_id: american_t.id})

f_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/afici.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/afici1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/afici2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/afici3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/afici4.jpeg"
]

attach_photos(f, f_arr)


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


BusinessTag.create!({business_id: g.id , tag_id: american_n.id})
BusinessTag.create!({business_id: g.id , tag_id: cocktail.id})

g_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/momo1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/momo2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/momo3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/momo4.jpeg"
]

attach_photos(g, g_arr)

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

BusinessTag.create!({business_id: h.id , tag_id: american_n.id})
BusinessTag.create!({business_id: h.id , tag_id: wine.id})

h_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/blind.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/blind1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/blind2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/blind3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/blind4.jpeg"
]

attach_photos(h, h_arr)



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


BusinessTag.create!({business_id: i.id , tag_id: pizza.id})
BusinessTag.create!({business_id: i.id , tag_id: wine.id})
BusinessTag.create!({business_id: i.id , tag_id: american_t.id})

i_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/brewvino.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/brewvino1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/brewvino2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/brewvino3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/brewvino4.jpeg"
]

attach_photos(i, i_arr)

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

BusinessTag.create!({business_id: j.id , tag_id: wine.id})

j_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/milli.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/milli1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/milli2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/milli3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/milli4.jpeg"
]

attach_photos(j, j_arr)

k = BusinessPage.create!({
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

BusinessTag.create!({business_id: k.id , tag_id: wine.id})
BusinessTag.create!({business_id: k.id , tag_id: w_spirits.id})

k_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/swirl.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/swirl2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/swirl3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/swirl4.jpeg"
]

attach_photos(k, k_arr)

l = BusinessPage.create!({
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

BusinessTag.create!({business_id: l.id , tag_id: wine.id})

l_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/unwin.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/unwin1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/unwin3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/unwin4.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/unwine2.jpeg"
]

attach_photos(l, l_arr)



m = BusinessPage.create!({
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

BusinessTag.create!({business_id: m.id , tag_id: wine.id})
m_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/ar2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/arc1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/arc3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/arc4.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/arc5.jpeg"
]

attach_photos(m, m_arr)


n = BusinessPage.create!({
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

BusinessTag.create!({business_id: n.id , tag_id: pizza.id})
BusinessTag.create!({business_id: n.id , tag_id: w_spirits.id})

n_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/laund.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/laund1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/laund2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/laund3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/laund4.jpeg"
]

attach_photos(n, n_arr)


o = BusinessPage.create!({
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

BusinessTag.create!({business_id: o.id , tag_id: italian.id})
BusinessTag.create!({business_id: o.id , tag_id: wine.id})

o_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/ino.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/ino1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/ino2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/ino3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/ino4.jpeg"
]

attach_photos(o, o_arr)


p = BusinessPage.create!({
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

BusinessTag.create!({business_id: p.id , tag_id: wine.id})
BusinessTag.create!({business_id: p.id , tag_id: american_n.id})

p_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/bodega.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/bodega1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/bodega2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/bodega3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/bodega4.jpeg"
]

attach_photos(p, p_arr)


q = BusinessPage.create!({
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

BusinessTag.create!({business_id: q.id , tag_id: wine.id})
BusinessTag.create!({business_id: q.id , tag_id: cafe.id})


q_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/soc.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/soc1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/soc2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/soc3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/soc4.jpeg"
]

attach_photos(q, q_arr)


r = BusinessPage.create!({
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

BusinessTag.create!({business_id: r.id , tag_id: wine.id})
BusinessTag.create!({business_id: r.id , tag_id: american_n.id})

r_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/birb.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/birb1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/birb2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/birb3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/birb4.jpeg"
]

attach_photos(r, r_arr)


s =BusinessPage.create!({
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

BusinessTag.create!({business_id: s.id , tag_id: wine.id})

s_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/mill.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/mill1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/mill2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/mill3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/millay.jpeg"
]

attach_photos(s, s_arr)


t = BusinessPage.create!({
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

BusinessTag.create!({business_id: t.id , tag_id: pizza.id})

t_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/centro.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/centro1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/centro2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/centro3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/centro4.jpeg"
]

attach_photos(t, t_arr)


u = BusinessPage.create!({
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

BusinessTag.create!({business_id: u.id , tag_id: pizza.id})

u_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/square1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/square2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/square3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/square4.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/swuare.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/swuare1.jpeg"
]

attach_photos(u, u_arr)


v = BusinessPage.create!({
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

BusinessTag.create!({business_id: v.id , tag_id: pizza.id})

v_arr = [
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/golden.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/golden1.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/golden2.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/golden3.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/golden4.jpeg"
]
 attach_photos(v, v_arr)

w = BusinessPage.create!({
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

BusinessTag.create!({business_id: w.id , tag_id: pizza.id})


w_arr = [
"https://ylp-seeds.s3.us-west-1.amazonaws.com/tony.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/tony1.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/tony2.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/tony3.jpeg",
"https://ylp-seeds.s3.us-west-1.amazonaws.com/tony4.jpeg"
]
attach_photos(w, w_arr)


 x = BusinessPage.create!({
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

BusinessTag.create!({business_id: x.id , tag_id: pizza.id})

x_arr = [
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/amore.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/amore1.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/amore2.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/amore3.jpeg",
  "https://ylp-seeds.s3.us-west-1.amazonaws.com/amore4.jpeg"
]  
attach_photos(x, x_arr)

puts "created businesses"

puts "creating sample reviews"

# Review.create!(
#   author_id: User.all.sample.id,
#   business_id: BusinessPage.all.sample.id,
#   rating: 4,
#   body: "I had a really great experience at this business. The staff were very friendly and helpful, and the products they sell are of excellent quality. I would definitely recommend this business to anyone looking for a great shopping experience!"
# )

# Review.create!(
#   author_id: User.all.sample.id,
#   business_id: BusinessPage.all.sample.id,
#   rating: 2,
#   body: "I was really disappointed with my experience at this business. The staff were unfriendly and unhelpful, and the products they sell are of very poor quality. I would not recommend this business to anyone looking for a good shopping experience."
# )

# Review.create!(
#   author_id: User.all.sample.id,
#   business_id: BusinessPage.all.sample.id,
#   rating: 5,
#   body: "I had an absolutely amazing experience at this business! The staff were incredibly knowledgeable and helpful, and the products they sell are truly exceptional. I cannot recommend this business highly enough!"
# )

# Review.create!(
#   author_id: User.all.sample.id,
#   business_id: BusinessPage.all.sample.id,
#   rating: 3,
#   body: "My experience at this business was pretty average. The staff were friendly enough, but not particularly knowledgeable, and the products they sell are decent but not exceptional. If you're in the area and need something from this type of business, it's not a bad option, but I wouldn't go out of my way to shop here."
# )



negative_reviews = [
  "Terrible experience! The food was horrible and the service was awful. Do not recommend!",
  "What a disappointing experience. The food was bad and the service was poor. Would not recommend.",
  "I had an awful time here. The food was terrible and the service was disappointing.",
  "The food was bad and the service was terrible. Would not recommend this place.",
  "This was a terrible experience. The food was awful and the service was bad. Do not recommend."
]

positive_reviews = [
  "This place is amazing! The food is delicious and the service is top-notch.",
  "I had a wonderful dining experience at this restaurant. The food was superb and the atmosphere was inviting.",
  "What a fantastic meal! The flavors were incredible and the presentation was beautiful.",
  "This restaurant is a must-visit. The food is some of the best I've ever had.",
  "I loved every dish I tried at this place. The attention to detail and flavors was impressive.",
  "What a gem! The service was fantastic and the food was exceptional.",
  "I had an incredible time at this restaurant. The staff were welcoming and the food was delicious.",
  "The menu at this place is inventive and exciting. Every dish I tried was a delight.",
  "What a great experience! The food was delicious and the atmosphere was cozy and inviting.",
  "I cannot recommend this restaurant enough. The food is outstanding and the service is excellent.",
  "This place is a real find. The food is delicious and the staff are friendly and knowledgeable.",
  "I was blown away by the quality of the food and service at this restaurant. It exceeded all of my expectations.",
  "The drinks at this place were great and the food was even better. I had an amazing time here.",
  "I cannot speak highly enough of this restaurant. The food was exceptional and the staff were attentive and friendly.",
  "This restaurant is simply outstanding. The attention to detail and flavors is truly impressive.",
  "I had a fantastic dining experience at this place. The food was delicious and the staff were so accommodating and friendly.",
  "The service at this restaurant was impeccable. The food was delicious and the atmosphere was cozy and inviting.",
  "What a hidden gem! The food was incredible and the staff were so welcoming.",
  "I cannot say enough good things about this restaurant. The food is exceptional and the staff are so friendly and accommodating.",
  "This place is a true gem. The food is simply amazing and the atmosphere is cozy and inviting.",
  "I had an amazing experience at this restaurant. The food was outstanding and the staff were so friendly and accommodating.",
  "The food at this place is out of this world. I loved every dish I tried and the service was fantastic.",
  "What an incredible meal! The flavors were incredible and the presentation was beautiful.",
  "This restaurant is a must-visit. The food is exceptional and the atmosphere is inviting.",
  "I loved every dish I tried at this place. The flavors were unique and delicious.",
  "What a fantastic restaurant! The food was delicious and the staff were so friendly and accommodating.",
  "I cannot recommend this place enough. The food is outstanding and the service is top-notch.",
  "This place is simply amazing. The food is exceptional and the atmosphere is cozy and inviting.",
  "I had an amazing time at this restaurant. The staff were welcoming and the food was delicious.",
  "What a great dining experience! The food was delicious and the atmosphere was inviting.",
  "The menu at this place is inventive and exciting. Every dish I tried was delicious and beautifully presented.",
  "I cannot speak highly enough of this restaurant. The food is exceptional and the staff are attentive and knowledgeable.",
  "This restaurant is simply outstanding. The attention to detail and flavors is truly impressive.",
  "I had a fantastic dining experience at this place. The food was delicious and the staff were so accommodating and friendly.",
  "The service at this restaurant was impeccable. The food was delicious and the atmosphere was cozy and inviting.",
  "What a hidden gem! The food was incredible and the staff were so welcoming.",
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
  "This place is an absolute must-visit! The food is incredible, and the staff are so friendly and welcoming.",
  "The atmosphere here is amazing! It's the perfect spot for a cozy night out with friends or a romantic date night.",
  "The food at this place is simply divine. Every dish is bursting with flavor, and the presentation is absolutely stunning.",
  "The service at this place is top-notch. The staff are friendly, knowledgeable, and always willing to go the extra mile.",
  "What a great find! This place exceeded my expectations in every way possible.",
  "I cannot recommend this place enough! Whether you're looking for a quick bite or a romantic dinner, they have it all.",
  "The drinks at this place are incredible! The mixologists really know what they're doing.",
  "What a fantastic meal! I loved every dish I tried, and the staff were so attentive and accommodating.",
  "The decor here is stunning. It's the perfect spot for a special occasion or a night out with friends.",
  "I had an amazing time here. The food was delicious, and the staff were so friendly and welcoming.",
  "This place is a true gem. The food is exceptional, and the atmosphere is cozy and inviting.",
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
  "This place is an absolute must-visit! The food is incredible, and the staff are so friendly and welcoming.",
  "This restaurant is absolutely amazing! The food was delicious, the service was excellent, and the atmosphere was cozy and welcoming.",
  "I had a wonderful experience at this restaurant. The staff were friendly and attentive, and the food was absolutely fantastic.",
  "If you're looking for an amazing meal, look no further than this restaurant! The food is delicious, and the staff are so friendly and accommodating.",
  "This place is a real hidden gem! The food was exceptional, and the atmosphere was cozy and inviting.",
  "What an incredible dining experience! The food was outstanding, and the staff were so friendly and attentive.",
  "I cannot recommend this restaurant enough! The food is amazing, and the staff are so knowledgeable and accommodating.",
  "This is definitely one of the best restaurants in town. The food is top-notch, and the staff are so friendly and welcoming.",
  "I had such a great time at this restaurant. The food was delicious, and the staff were so friendly and attentive.",
  "This place is a must-visit for anyone looking for great food and a cozy atmosphere. The staff were so welcoming, and the food was splendid",
  "The food was delicious and beautifully presented. The staff were friendly and welcoming.",
  "This place is a gem. The food is amazing, and the service is outstanding.",
  "I had an incredible dining experience here. The food was impeccable, and the staff were so attentive and friendly.",
  "The atmosphere here is so cozy and inviting, and the food is absolutely delicious. A must-visit!",
  "I was blown away by the quality of the food and service here. Highly recommend!",
  "The staff here are so friendly and welcoming. And the food? Delicious!",
  "I can't stop thinking about the amazing meal I had here. Everything was perfect!",
  "What a great find! The food was fantastic, and the staff were so accommodating.",
  "This place is a true gem. The food is delicious, and the staff are incredibly knowledgeable and helpful.",
  "I had such a wonderful time here. The food was exceptional, and the staff were so attentive.",
  "The attention to detail here is incredible. The food was beautifully presented and tasted even better than it looked.",
  "I came here for a special occasion, and it did not disappoint. The food was incredible, and the service was top-notch.",
  "The food here is some of the best I've ever had. And the staff are so friendly and welcoming.",
  "I had an amazing experience here. The food was exceptional, and the staff were so accommodating and friendly.",
  "What a fantastic restaurant! The food was delicious, and the staff were so knowledgeable and welcoming.",
  "I would come back here in a heartbeat. The food was amazing, and the staff were so friendly and accommodating.",
  "This place exceeded all of my expectations. The food was incredible, and the staff were so attentive.",
  "I loved everything about this restaurant. The food was outstanding, and the staff were so friendly and welcoming.",
  "The food here is simply amazing. And the staff are so accommodating and friendly.",
  "What a wonderful dining experience! The food was delicious, and the staff were so attentive and friendly.",
  "I had an amazing meal here! The food was delicious, and the staff were so friendly and welcoming.",
  "What a great experience! The menu was inventive, and the execution was flawless.",
  "I cannot speak highly enough of this place. The food is simply outstanding, and the atmosphere is cozy and inviting.",
  "This restaurant is a true gem. The food is exceptional, and the staff are so knowledgeable and friendly.",
  "I had such a great time at this place. The atmosphere was warm and welcoming, and the food was absolutely delicious.",
  "The food here is simply outstanding. Every dish was a work of art, and they tasted even better than they looked.",
  "What a fantastic dining experience! The food was amazing, and the staff were so accommodating and friendly.",
  "I cannot recommend this place enough! The food is exceptional, and the staff are incredibly knowledgeable and helpful.",
  "This is hands down one of the best restaurants I've been to in a long time. The menu is inventive, and the execution is flawless.",
  "I had an amazing time here. The food was fantastic, and the staff were so attentive and friendly.",
  "I cannot speak highly enough of this place. The food is simply outstanding, and the staff are incredibly welcoming and friendly.",
  "What a fantastic experience! The food was delicious, and the staff were so accommodating and attentive.",
  "I had such a great time at this restaurant. The atmosphere was warm and inviting, and the food was absolutely amazing.",
  "This place is a true gem. The food is exceptional, and the staff are incredibly knowledgeable and friendly.",
  "The food here is simply outstanding. Every dish was a work of art, and they tasted even better than they looked.",
  "What a fantastic dining experience! The food was amazing, and the staff were so accommodating and friendly.",
  "I cannot recommend this place enough! The food is exceptional, and the staff are incredibly knowledgeable and helpful.",
  "This is hands down one of the best restaurants I've been to in a long time. The menu is inventive, and the execution is flawless.",
  "I had an amazing time here. The food was fantastic, and the staff were so attentive and friendly.",
  "I cannot speak highly enough of this place. The food is simply outstanding, and the staff are incredibly welcoming and friendly.",
  "What a fantastic experience! The food was delicious, and the staff were so accommodating and attentive.",
  "This place is a true gem. The food is exceptional, and the staff are incredibly knowledgeable and friendly.",
  "The food here is simply outstanding. Every dish was a work of art, and they tasted even better than they looked.",
  "What a fantastic dining experience! The food was amazing, and the staff were so accommodating and friendly.",
  "Absolutely amazing dining experience! The food was divine and the atmosphere was perfect.",
  "I was blown away by the quality of the food here. Every dish was a masterpiece.",
  "What a hidden gem! The menu was so inventive and everything we tried was delicious.",
  "I can't say enough good things about this restaurant. The food was outstanding and the staff were so friendly and attentive.",
  "I had a wonderful evening here. The food was delicious and the ambiance was perfect.",
  "This place exceeded all of my expectations. The food was delicious and the service was top-notch.",
  "The staff here were so welcoming and accommodating. I felt right at home as soon as I walked in.",
  "I cannot recommend this place enough! The food was some of the best I've ever had.",
  "The dishes here were so flavorful and inventive. I loved every bite!",
  "I had an incredible time at this restaurant. The food was delicious and the staff were so friendly and attentive.",
  "This is hands down one of the best restaurants I've ever been to. The food was divine and the service was outstanding.",
  "The atmosphere here was so cozy and inviting. I could have stayed all night!",
  "I cannot speak highly enough of this restaurant. The food was exceptional and the staff were so friendly and knowledgeable.",
  "This place is an absolute must-visit! The food is incredible and the staff are so accommodating and friendly.",
  "I was blown away by the quality of the food and service here. I can't wait to come back!",
  "This restaurant is simply outstanding. The food is delicious and the staff are so knowledgeable and helpful.",
  "I had an amazing experience here. The food was delicious and the staff were incredibly attentive.",
  "What a fantastic dining experience! The food was incredible and the staff were so friendly and accommodating.",
  "This place is a true gem! The food is delicious and the staff were so friendly and welcoming.",
  "The dishes here were so beautifully presented and tasted even better than they looked.",
  "I had an unforgettable evening at this restaurant. The food was incredible and the staff were so accommodating.",
  "I had an incredible time at this restaurant. The food was delicious and the atmosphere was perfect.",
  "The service here was exceptional and the food was some of the best I've ever had.",
  "This restaurant is a true standout! The food was inventive and absolutely delicious.",
  "What a wonderful dining experience! The food was outstanding and the staff were so friendly and welcoming.",
  "I can't recommend this restaurant enough. The food is amazing and the staff are so attentive and accommodating.",
  "The dishes here were so flavorful and beautifully presented. I can't wait to come back!",
  "I had an amazing time at this restaurant. The food was delicious and the staff were so friendly and welcoming.",
  "What a fantastic find! The food here is outstanding and the service is top-notch.",
  "The staff here went above and beyond to make sure we had a wonderful evening. The food was delicious too!",
  "This restaurant is a true gem! The food is absolutely amazing and the staff are so friendly and knowledgeable."
]
# 139 entries + 30

average_reviews = [
  "The food was okay, nothing special. The service was decent, but nothing to write home about.",
  "This place was fine. The food was decent, but I wouldn't go out of my way to come back.",
  "The atmosphere was nice, but the food was just okay. I wouldn't say it's a must-visit.",
  "The service was good, but the food was just average. I wouldn't say it was anything special.",
  "It was an alright experience. The food was decent, but nothing stood out to me.",
  "I wasn't blown away by this place, but it was decent. The service was good, but the food was just okay.",
  "The food was alright, but I wouldn't say it was anything to write home about. The service was good, though.",
  "It was a decent meal, but nothing spectacular. The atmosphere was nice, but the food was just okay.",
  "I had an okay experience here. The food was decent, but I wouldn't say it was anything special.",
  "This place was fine, but nothing to write home about. The service was good, but the food was just average.",
  "The food was decent, but nothing special. The service was good, but I wouldn't say it was exceptional.",
  "It was an okay experience. The food was decent, but I wouldn't say it was anything to write home about.",
  "The service was good, but the food was just average. It wasn't a bad experience, but it wasn't great either.",
  "It was a decent meal, but nothing to write home about. The service was good, but the food was just okay.",
  "This place was alright. The food was decent, but I wouldn't go out of my way to come back.",
  "The atmosphere was nice, but the food was just okay. I wouldn't say it's a must-visit.",
  "It was a decent experience. The food was okay, but nothing stood out to me.",
  "The service was good, but the food was just average. It wasn't a bad experience, but it wasn't great either.",
  "The food was decent, but nothing special. The service was good, but I wouldn't say it was exceptional.",
  "It was an okay meal, but nothing spectacular. The atmosphere was nice, but the food was just okay.",
  "This place was fine, but nothing to write home about. The food was okay, but not memorable.",
  "The food was decent, but I wouldn't say it was anything special. The service was good, though.",
  "It was a decent experience. The food was okay, but nothing stood out to me.",
  "The service was good, but the food was just average. It wasn't a bad experience, but it wasn't great either.",
  "The food was alright, but nothing to write home about. The atmosphere was nice, but not memorable.",
  "It was a decent meal, but nothing spectacular. The service was good, but the food was just okay.",
  "This place was fine, but nothing to write home about. The food was okay, but not memorable.",
  "The food was decent, but nothing to write home about. The service was good, but not exceptional.",
  "It was an okay experience. The food was decent, but nothing stood out to me.",
  "The service was good, but the food was just average. It wasn't a bad experience, but it wasn't great either.",
  "It was a decent meal, but nothing to write home about. The atmosphere was pleasant",
  "The food was decent, but nothing special. The service was friendly enough.",
  "Overall, I had an okay experience at this restaurant. The atmosphere was nice, but the food was just average.",
  "I wasn't blown away by the food at this place, but it wasn't bad either. The service was good though.",
  "The food was average and a bit underwhelming, but the atmosphere was nice and the staff were friendly.",
  "The service was decent, but the food was nothing to write home about. It was okay, but not great.",
  "I had a pretty average experience at this restaurant. The food was decent, but not exceptional.",
  "The food was okay, but nothing stood out as particularly amazing. The service was friendly though.",
  "This restaurant was just okay. The food was decent, but the atmosphere was a bit lacking.",
  "I had an average experience at this place. The food was decent, but not outstanding.",
  "The food was okay, but nothing special. The staff were friendly enough though.",
  "I wasn't particularly impressed with the food at this restaurant. It was just okay.",
  "Overall, I had an average experience at this place. The food was decent, but not exceptional.",
  "The food was average, but the service was friendly and attentive.",
  "I had an okay experience at this restaurant. The food was decent, but not amazing.",
  "The food was average and the atmosphere was nothing special. The service was friendly though.",
  "The food was okay, but nothing to write home about. The service was decent though.",
  "I wasn't blown away by the food at this restaurant, but it wasn't terrible either. Just average.",
  "The service was decent, but the food was nothing special. It was okay, but not great.",
  "Overall, I had an average experience at this restaurant. The food was decent, but not exceptional.",
  "The food was okay, but nothing stood out as particularly amazing. The service was friendly though.",
  "This restaurant was just okay. The food was decent, but the atmosphere was a bit lacking.",
  "I had an average experience at this place. The food was decent, but not outstanding.",
  "The food was okay, but nothing special. The staff were friendly enough though.",
  "I wasn't particularly impressed with the food at this restaurant. It was just okay.",
  "Overall, I had an average experience at this place. The food was decent, but not exceptional.",
  "The food was average, but the service was friendly and attentive.",
  "I had an okay experience at this restaurant. The food was decent, but not amazing.",
  "The food was average and the atmosphere was nothing special. The service was friendly though.",
  "The food was okay, but nothing to write home about. The service was decent though.",
  "I wasn't blown away by the food at this restaurant, but it wasn't terrible either. Just average.",
  "The service was decent, but the food was nothing special. It was okay, but not great.",
  "Overall, I had an average experience at this restaurant. The food was decent, but not exceptional.",
  "The food was okay, but nothing stood out as particularly amazing. The service was friendly though.",
  "This restaurant was just okay. The food was decent, but the atmosphere was a bit lacking.",
  "I had an average experience at this place. The food was decent, but not outstanding.",
  "The food was okay, but nothing special. The staff were friendly enough though.",
  "I wasn't particularly impressed",
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
  "It was a satisfactory experience, but nothing too memorable.",
  "The food was decent, but nothing to write home about. The service was okay.",
  "I had an alright time at this place. The food was average, and the service was pretty slow.",
  "The food here was fine, but not particularly memorable. The atmosphere was pretty bland as well.",
  "This restaurant was just okay. The food was average, and the service was nothing special.",
  "I wasn't particularly impressed with this place. The food was average, and the atmosphere was pretty lackluster.",
  "The food here was decent, but not particularly exceptional. The service was alright.",
  "I had an okay experience here. The food was average, and the service was pretty slow.",
  "The restaurant was fine, but not particularly memorable. The food was decent, and the service was okay.",
  "I would describe my experience here as average. The food was okay, and the service was nothing special.",
  "The food was decent, but not particularly exceptional. The service was average.",
  "I had an average experience at this place. The food was okay, and the service was nothing special.",
  "This restaurant was pretty average. The food was decent, and the service was okay.",
  "The food here was okay, but not particularly memorable. The service was average as well.",
  "I had an average time at this place. The food was decent, and the service was okay.",
  "This restaurant was fine, but nothing stood out. The food was average, and the service was pretty slow.",
  "The food was decent, but not particularly memorable. The atmosphere was pretty average as well.",
  "I wasn't particularly impressed with this place. The food was average, and the service was pretty slow.",
  "The restaurant was fine, but not particularly memorable. The food was decent, and the service was okay.",
  "I would describe my experience here as average. The food was okay, and the service was nothing special.",
  "The food was decent, but not particularly exceptional. The service was pretty average."
]
# 82 entries + 30

business_ids = BusinessPage.pluck(:id)
author_ids = User.pluck(:id)

def create_positive_reviews(business_id, reviews, n)
    n.times do
      review = reviews.shift
      Review.create!(
        body: review,
        rating: rand(4..5),
        business_id: business_id
      )
    end
end
def create_average_reviews(business_id, reviews, n)
    n.times do
      review = reviews.shift
      Review.create!(
        author_id:,
        body: review,
        rating: rand(2..4),
        business_id: business_id
      )
    end
end


def create_reviews(business_ids, positive_reviews, average_reviews, author_ids)
  business_ids.each_with_index do |business_id, idx|
    3.times do
      pos_review = positive_reviews.shift
      Review.create!(
        author_id: author_ids.rotate!.first,
        body: pos_review,
        rating: rand(4..5),
        business_id: business_id
      )
    end
    3.times do
      avg_review = average_reviews.shift
      Review.create!(
        author_id: author_ids.rotate!.first,
        body: avg_review,
        rating: rand(2..4),
        business_id: business_id
      )
      pos_review = positive_reviews.shift
      Review.create!(
        author_id: author_ids.rotate!.first,
        body: pos_review,
        rating: rand(4..5),
        business_id: business_id
      )
    end
  end
end

def create_negative_reviews(businesses, reviews, author_ids)
  reviews.each do |review|
      author = author_ids.shuffle.rotate!.first
      business = businesses.shuffle.rotate!.first
      reviewerIds = business.reviewers.map {|reviewer| reviewer.id}
      while reviewerIds.include?(author)
        author = author_ids.shuffle.rotate!.first
      end

      Review.create!(
        author_id: author,
        body: review,
        rating: rand(1..2),
        business_id: business.id
      )
  end
end


puts "seeding random reviews"

create_reviews(business_ids, positive_reviews, average_reviews, author_ids)
businesses = BusinessPage.all
puts "seeding negative_reviews"





def create_negative_reviews(businesses, reviews, author_ids)
    un = User.create!(
        f_name: "Nancy",
        l_name: "N",
        email:"n@n.com",
        username: "Negative",
        password: "123456"
      )

    business = businesses.shuffle

  reviews.each do |review|
      # author = author_ids.shuffle.rotate!.first
      # reviewerIds = business.reviewers.map {|reviewer| reviewer.id}
      # while reviewerIds.include?(author)
      #   author = author_ids.shuffle.rotate!.first
      # end
      Review.create!(
        author_id: un.id,
        body: review,
        rating: rand(1..2),
        business_id: business.rotate!.first.id
      )
  end
end

create_negative_reviews(businesses, negative_reviews, author_ids)


puts "done!"