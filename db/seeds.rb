# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


a = BusinessPage.create({
    name: "McDonald's",
    hours: { 
            mon: "6:30am-10pm", 
            tues: "6:30am-10pm", 
            weds: "6:30am-10pm", 
            thurs: "6:30am-10pm",
            fri: "6:30am-10pm",
            sat: "6:30am-10pm",
            sun: "6:30am-10pm" },
    about: "american fast food",
    phone_num: "(408) 554-0883",
    address: { 
            street: "5122 Stevens Creek Blvd",
            city: "San Jose",
            state: "CA"
            },
    postal_code: "95129",
    location: { lat: -121.949574, lng: 37.322948 }}
)

b = BusinessPage.create({
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
    address: { 
            street: "3174 16th St",
            city: "San Francisco",
            state: "CA"
            },
    postal_code: "94103",
    location: { lat: 37.765551, lng: -122.422962 }}
)
# Cocktail Bars, American(New)

c = BusinessPage.create({
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

d = BusinessPage.create({
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

