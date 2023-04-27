# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"


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
photoa1 = URI.open("s3://ylp-seeds/mcdonald.jpeg")
a.attach(
  io: photoa1,
  filename: "mcdonald.jpeg"
)
photoa2 = URI.open("s3://ylp-seeds/mcdonald1.jpeg")
a.attach(
  io: photoa2,
  filename: "mcdonald1.jpeg"
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

photob1 = URI.open("s3://ylp-seeds/abv.jpeg")
b.attach(
  io: photob1,
  filename: "abv.jpeg"
)
photob2 = URI.open("s3://ylp-seeds/abv2.jpeg")
b.attach(
  io: photob2,
  filename: "abv2.jpeg"
)
photob3 = URI.open("s3://ylp-seeds/abv3.jpeg")
b.attach(
  io: photob3,
  filename: "abv3.jpeg"
)
photob4 = URI.open("s3://ylp-seeds/abv4.jpeg")
b.attach(
  io: photob4,
  filename: "abv4.jpeg"
)


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
photoc1 = URI.open("s3://ylp-seeds/liho.png")
c.attach(
  io: photoc1,
  filename: "liho.png"
)

photoc2 = URI.open("s3://ylp-seeds/liho1.jpeg")
c.attach(
  io: photoc2,
  filename: "liho1.jpeg"
)

photoc3 = URI.open("s3://ylp-seeds/liho2.jpeg")
c.attach(
  io: photoc3,
  filename: "liho2.jpeg"
)

photoc4 = URI.open("s3://ylp-seeds/liho3.jpeg")
c.attach(
  io: photoc4,
  filename: "liho3.jpeg"
)


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

photod1 = URI.open("s3://ylp-seeds/good.jpeg")
d.attach(
  io: photod1,
  filename: "good.jpeg"
)
photod2 = URI.open("s3://ylp-seeds/good1.jpeg")
d.attach(
  io: photod2,
  filename: "good1.jpeg"
)
photod3 = URI.open("s3://ylp-seeds/good2.jpeg")
d.attach(
  io: photod3,
  filename: "good2.jpeg"
)
photod4 = URI.open("s3://ylp-seeds/good3.jpeg")
d.attach(
  io: photod4,
  filename: "good3.jpeg"
)
photod5 = URI.open("s3://ylp-seeds/good4.jpeg")
d.attach(
  io: photod5,
  filename: "good4.jpeg"
)

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
photoe1 = URI.open("s3://ylp-seeds/brendas 3.jpeg")
e.attach(
  io: photoe1,
  filename: "brendas 3.jpeg"
)
photoe2 = URI.open("s3://ylp-seeds/brendas.jpeg")
e.attach(
  io: photoe2,
  filename: "brendas.jpeg"
)
photoe3 = URI.open("s3://ylp-seeds/brendas1.jpeg")
e.attach(
  io: photoe3,
  filename: "brendas1.jpeg"
)
photoe4 = URI.open("s3://ylp-seeds/brendas4.jpeg")
e.attach(
  io: photoe4,
  filename: "brendas4.jpeg"
)


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
photof1 = URI.open("s3://ylp-seeds/afici.jpeg")
f.attach(
  io: photof1,
  filename: "afici.jpeg"
)
photof2 = URI.open("s3://ylp-seeds/afici1.jpeg")
f.attach(
  io: photof2,
  filename: "afici1.jpeg"
)
photof3 = URI.open("s3://ylp-seeds/afici2.jpeg")
f.attach(
  io: photof3,
  filename: "afici2.jpeg"
)
photof4 = URI.open("s3://ylp-seeds/afici3.jpeg")
f.attach(
  io: photof4,
  filename: "afici3.jpeg"
)
photof5 = URI.open("s3://ylp-seeds/afici4.jpeg")
f.attach(
  io: photof5,
  filename: "afici4.jpeg"
)

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
photog1 = URI.open("s3://ylp-seeds/momo.jpeg")
g.attach(
  io: photog1,
  filename: "momo.jpeg"
)
photog2 = URI.open("s3://ylp-seeds/momo1.jpeg")
g.attach(
  io: photog2,
  filename: "momo1.jpeg"
)
photog3 = URI.open("s3://ylp-seeds/momo2.jpeg")
g.attach(
  io: photog3,
  filename: "momo2.jpeg"
)
photog4 = URI.open("s3://ylp-seeds/momo3.jpeg")
g.attach(
  io: photog4,
  filename: "momo3.jpeg"
)
photog5 = URI.open("s3://ylp-seeds/momo4.jpeg")
g.attach(
  io: photog5,
  filename: "momo4.jpeg"
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

photoh1 = URI.open("s3://ylp-seeds/blind.jpeg")
h.attach(
  io: photoh1,
  filename: "blind.jpeg"
)
photoh2 = URI.open("s3://ylp-seeds/blind1.jpeg")
h.attach(
  io: photoh2,
  filename: "blind1.jpeg"
)
photoh3 = URI.open("s3://ylp-seeds/blind2.jpeg")
h.attach(
  io: photoh3,
  filename: "blind2.jpeg"
)
photoh4 = URI.open("s3://ylp-seeds/blind3.jpeg")
h.attach(
  io: photoh4,
  filename: "blind3.jpeg"
)
photoh5 = URI.open("s3://ylp-seeds/blind4.jpeg")
h.attach(
  io: photoh5,
  filename: "blind4.jpeg"
)

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
photoi1 = URI.open("s3://ylp-seeds/brewvino.jpeg")
i.attach(
  io: photoi1,
  filename: "brewvino.jpeg"
)
photoi2 = URI.open("s3://ylp-seeds/brewvino1.jpeg")
i.attach(
  io: photoi2,
  filename: "brewvino1.jpeg"
)
photoi3 = URI.open("s3://ylp-seeds/brewvino2.jpeg")
i.attach(
  io: photoi3,
  filename: "brewvino2.jpeg"
)
photoi4 = URI.open("s3://ylp-seeds/brewvino3.jpeg")
i.attach(
  io: photoi4,
  filename: "brewvino3.jpeg"
)
photoi5 = URI.open("s3://ylp-seeds/brewvino4.jpeg")
i.attach(
  io: photoi5,
  filename: "brewvino4.jpeg"
)

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
photoj1 = URI.open("s3://ylp-seeds/milli.jpeg")
j.attach(
  io: photoj1,
  filename: "milli.jpeg"
)
photoj2 = URI.open("s3://ylp-seeds/milli1.jpeg")
j.attach(
  io: photoj2,
  filename: "milli1.jpeg"
)
photoj3 = URI.open("s3://ylp-seeds/milli2.jpeg")
j.attach(
  io: photoj3,
  filename: "milli2.jpeg"
)
photoj4 = URI.open("s3://ylp-seeds/milli3.jpeg")
j.attach(
  io: photoj4,
  filename: "milli3.jpeg"
)
photoj5 = URI.open("s3://ylp-seeds/milli4.jpeg")
j.attach(
  io: photoj5,
  filename: "milli3.jpeg"
)

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
photok1 = URI.open("s3://ylp-seeds/swirl.jpeg")
k.attach(
  io: photok1,
  filename: "swirl.jpeg"
)
photok2 = URI.open("s3://ylp-seeds/swirl2.jpeg")
k.attach(
  io: photok2,
  filename: "swirl2.jpeg"
)
photok3 = URI.open("s3://ylp-seeds/swirl3.jpeg")
k.attach(
  io: photok3,
  filename: "swirl3.jpeg"
)
photok4 = URI.open("s3://ylp-seeds/swirl4.jpeg")
k.attach(
  io: photok4,
  filename: "swirl4.jpeg"
)

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
photol1 = URI.open("s3://ylp-seeds/unwin.jpeg")
l.attach(
  io: photol1,
  filename: "unwin.jpeg"
)
photol2 = URI.open("s3://ylp-seeds/unwin1.jpeg")
l.attach(
  io: photol2,
  filename: "unwin1.jpeg"
)
photol3 = URI.open("s3://ylp-seeds/unwin3.jpeg")
l.attach(
  io: photol3,
  filename: "unwin3.jpeg"
)
photol4 = URI.open("s3://ylp-seeds/unwin4.jpeg")
l.attach(
  io: photol4,
  filename: "unwin4.jpeg"
)
photol5 = URI.open("s3://ylp-seeds/unwine2.jpeg")
l.attach(
  io: photol5,
  filename: "unwine2.jpeg"
)


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
photom1 = URI.open("s3://ylp-seeds/ar2.jpeg")
m.attach(
  io: photom1,
  filename: "ar2.jpeg"
)
photom2 = URI.open("s3://ylp-seeds/arc1.jpeg")
m.attach(
  io: photom2,
  filename: "arc1.jpeg"
)
photom3 = URI.open("s3://ylp-seeds/arc3.jpeg")
m.attach(
  io: photom3,
  filename: "arc3.jpeg"
)
photom4 = URI.open("s3://ylp-seeds/arc3.jpeg")
m.attach(
  io: photom4,
  filename: "arc3.jpeg"
)
photom5 = URI.open("s3://ylp-seeds/arc4.jpeg")
m.attach(
  io: photom5,
  filename: "arc4.jpeg"
)
photom6 = URI.open("s3://ylp-seeds/arc5.jpeg")
m.attach(
  io: photom6,
  filename: "arc5.jpeg"
)

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
photon1 = URI.open("s3://ylp-seeds/laund.jpeg")
n.attach(
  io: photon1,
  filename: "laund.jpeg"
)
photon2 = URI.open("s3://ylp-seeds/laund1.jpeg")
n.attach(
  io: photon2,
  filename: "laund1.jpeg"
)
photon3 = URI.open("s3://ylp-seeds/laund2.jpeg")
n.attach(
  io: photon3,
  filename: "laund2.jpeg"
)
photon4 = URI.open("s3://ylp-seeds/laund3.jpeg")
n.attach(
  io: photon4,
  filename: "laund3.jpeg"
)
photon5 = URI.open("s3://ylp-seeds/laund4.jpeg")
n.attach(
  io: photon5,
  filename: "laund4.jpeg"
)

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
photoo1 = URI.open("s3://ylp-seeds/ino.jpeg")
o.attach(
  io: photoo1,
  filename: "ino.jpeg"
)
photoo2 = URI.open("s3://ylp-seeds/ino1.jpeg")
o.attach(
  io: photoo2,
  filename: "ino1.jpeg"
)
photoo3 = URI.open("s3://ylp-seeds/ino2.jpeg")
o.attach(
  io: photoo3,
  filename: "ino2.jpeg"
)
photoo4 = URI.open("s3://ylp-seeds/ino3.jpeg")
o.attach(
  io: photoo4,
  filename: "ino3.jpeg"
)
photoo5 = URI.open("s3://ylp-seeds/ino4.jpeg")
o.attach(
  io: photoo5,
  filename: "ino4.jpeg"
)

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
photop1 = URI.open("s3://ylp-seeds/bodega.jpeg")
p.attach(
  io: photop1,
  filename: "bodega.jpeg"
)
photop2 = URI.open("s3://ylp-seeds/bodega1.jpeg")
p.attach(
  io: photop2,
  filename: "bodega1.jpeg"
)
photop3 = URI.open("s3://ylp-seeds/bodega2.jpeg")
p.attach(
  io: photop3,
  filename: "bodega2.jpeg"
)
photop4 = URI.open("s3://ylp-seeds/bodega3.jpeg")
p.attach(
  io: photop4,
  filename: "bodega3.jpeg"
)
photop5 = URI.open("s3://ylp-seeds/bodega4.jpeg")
p.attach(
  io: photop5,
  filename: "bodega4.jpeg"
)

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
photoq1 = URI.open("s3://ylp-seeds/soc.jpeg")
q.attach(
  io: photoq1,
  filename: "soc.jpeg"
)
photoq2 = URI.open("s3://ylp-seeds/soc1.jpeg")
q.attach(
  io: photoq2,
  filename: "soc1.jpeg"
)
photoq3 = URI.open("s3://ylp-seeds/soc2.jpeg")
q.attach(
  io: photoq3,
  filename: "soc2.jpeg"
)
photoq4 = URI.open("s3://ylp-seeds/soc3.jpeg")
q.attach(
  io: photoq4,
  filename: "soc3.jpeg"
)
photoq5 = URI.open("s3://ylp-seeds/soc4.jpeg")
q.attach(
  io: photoq5,
  filename: "soc4.jpeg"
)

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
photor1 = URI.open("s3://ylp-seeds/birb.jpeg")
r.attach(
  io: photor1,
  filename: "birb.jpeg"
)
photor2 = URI.open("s3://ylp-seeds/birb1.jpeg")
r.attach(
  io: photor2,
  filename: "birb1.jpeg"
)
photor3 = URI.open("s3://ylp-seeds/birb2.jpeg")
r.attach(
  io: photor3,
  filename: "birb2.jpeg"
)
photor4 = URI.open("s3://ylp-seeds/birb3.jpeg")
r.attach(
  io: photor4,
  filename: "birb3.jpeg"
)
photor5 = URI.open("s3://ylp-seeds/birb4.jpeg")
r.attach(
  io: photor5,
  filename: "birb4.jpeg"
)

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
photos1 = URI.open("s3://ylp-seeds/millay.jpeg")
s.attach(
  io: photos1,
  filename: "millay.jpeg"
)
photos2 = URI.open("s3://ylp-seeds/mill.jpeg")
s.attach(
  io: photos2,
  filename: "mill.jpeg"
)
photos3 = URI.open("s3://ylp-seeds/mill1.jpeg")
s.attach(
  io: photos3,
  filename: "mill1.jpeg"
)
photos4 = URI.open("s3://ylp-seeds/mill2.jpeg")
s.attach(
  io: photos4,
  filename: "mill2.jpeg"
)
photos5 = URI.open("s3://ylp-seeds/mill3.jpeg")
s.attach(
  io: photos5,
  filename: "mill3.jpeg"
)

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
photot1 = URI.open("s3://ylp-seeds/centro.jpeg")
t.attach(
  io: photot1,
  filename: "centro.jpeg"
)
photot2 = URI.open("s3://ylp-seeds/centro1.jpeg")
t.attach(
  io: photot2,
  filename: "centro1.jpeg"
)
photot3 = URI.open("s3://ylp-seeds/centro2.jpeg")
t.attach(
  io: photot3,
  filename: "centro2.jpeg"
)
photot4 = URI.open("s3://ylp-seeds/centro3.jpeg")
t.attach(
  io: photot4,
  filename: "centro3.jpeg"
)
photot5 = URI.open("s3://ylp-seeds/centro4.jpeg")
t.attach(
  io: photot5,
  filename: "centro4.jpeg"
)

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
photou1 = URI.open("s3://ylp-seeds/square1.jpeg")
u.attach(
  io: photou1,
  filename: "square1.jpeg"
)
photou2 = URI.open("s3://ylp-seeds/square2.jpeg")
u.attach(
  io: photou2,
  filename: "square2.jpeg"
)
photou3 = URI.open("s3://ylp-seeds/square3.jpeg")
u.attach(
  io: photou3,
  filename: "square3.jpeg"
)
photou4 = URI.open("s3://ylp-seeds/square4.jpeg")
u.attach(
  io: photou4,
  filename: "square4.jpeg"
)
photou5 = URI.open("s3://ylp-seeds/swuare.jpeg")
u.attach(
  io: photou5,
  filename: "swuare.jpeg"
)
photou6 = URI.open("s3://ylp-seeds/swuare1.jpeg")
u.attach(
  io: photou6,
  filename: "swuare1.jpeg"
)

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

