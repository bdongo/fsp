# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


b = BusinessPage.create({
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
    phone_num: " (408) 554-0883",
    address: { 
            street: "5122 Stevens Creek Blvd",
            city: "San Jose",
            state: "CA"
            },
    postal_code: "95129",
    location: { lat: -121.949574, lng: 37.322948 }}
)