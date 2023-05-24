# Yelp Clone <img src="frontend/public/images/icon.png" width="23" > 
 [Live Site](https://ylp.onrender.com/)

This is a full stack clone of popular food review and rating site, Yelp. Created in a 2 week sprint using `React`, `React-Redux`, `Ruby on Rails`, `PostgresSQL`, `Google Maps JavaScript API` and `AWS`, this project replicates the features of Yelp. 

## Features

* Highlighted are full user sign up and authorization. 

* Business pages that can be viewed and reviewed by users. 

* Search bar to find businesses according to tags or names using RESTful backend. 

* Google Maps API to see where the businesses are individually or as grouped in a search query.

* Clean visual interface to capture important information of reviews on idividually or averaged on the business pages.


[Original Site](https://www.yelp.com/)

## Demo

Star rating is responsive to hover and changes color and text. Rating is recorded on click without interupting the hover function but will snap back to clicked rating on mouse out.

![](https://media.giphy.com/media/bpbsW9ZlDuorgPq1qV/giphy.gif)

If no user is signed in, pop up will show to sign in or transition into sign up module. Users can also opt into using the demo account.

![](https://media.giphy.com/media/1Let43yWcTCS81O0qI/giphy.gif)

Search brings up results in a list. List items highlight when hovered over and can be clicked to redirect to the business show page. Business tags can be clicked to search the tags. Google Maps API is integrated and shows markers numbered the same as the business results.

<img width="500" alt="Screen Shot 2023-05-05 at 9 11 15 AM" src="https://user-images.githubusercontent.com/121202044/236511636-113f0b62-331f-4b66-ac8b-79a3512a7a95.png">


## Overview

Yelp's strength is their sheer amount of crowd sourced reviews for businesses. To create a site that could visually compare would need an equal robust seed file. To be efficient as well as scaliable, this function was created to attach photos to businesses.

```ruby
db>seeds.rb

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
```

The searchbar connects to the backend through API BusinessController#index for active record queries, to keep code dry and multifunctional.

```js
frontend>src>store>businessPages.js

export const searchBusinesses = (query) => async (dispatch) => {
    const res = await csrfFetch(`/api/business_pages?query=${query}`)
    if (res.ok) {
        const businessPages = await res.json()
        dispatch(receiveAllBusiness(businessPages))
        return res
    }
}
```

```ruby
app>controllers>api>business_pages_controller.rb

def index 
    query = params[:query]
    
    if query 
        @bizs = BusinessPage.joins(:tags)
                    .where("name ILIKE ? OR tags.tag_name ILIKE ?", "%#{query}%", "%#{query}%")
        @users = User.all
        @reviews = Review.all
        render :index
    else
        @bizs = BusinessPage.all
        @users = User.all
        @reviews = Review.all
        render :index
    end
end
```

Curried functions allow for double click warnings for editing reviews, to ensure user is not accidentally closing out of the editor.

```js
frontend>src>components>EditModal>index.js

const [error, setError] = useState();
const [clicks, setClicks] = useState(0);

const handleClose = () => {

    return () => {
        setClicks(clicks+1)
        if (clicks === 0) {
            setError("Changes will not save if you close editor. Click again to confirm")
        } else if (clicks === 1) {
            setShowEditModal(false)
        }     
    }
}
```

Constantly learning and optimizing for effeciency and legibility. A clunky if statement in an useEffect was transformed into two separate arrays that allowed for direct indexing based on the value of hoverRating. The original code involved multiple conditionals and multiple state variables to set the hoverStar and desc values, while the optimized version utilized arrays for efficient access. 

New code:
```js
    const [hoverRating, setHoverRating] = useState(0);

    const hoverStarArr = [
        'blank-star star-rating',
        'yellow-star star-rating',
        'yellow-orange-star star-rating',
        'orange-star star-rating',
        'red-orange-star star-rating',
        'red-star star-rating'
    ]

    const descArr = [
        'Select your rating',
        'Not good',
        "Could've been better",
        "OK",
        "Good",
        "Great"
    ]

    <div
    id='star5'
    onClick={() => setRating(5)}
    onMouseEnter={() => setHoverRating(5)}
    onMouseLeave={() => setHoverRating(rating)}
    >
        <i className={hoverRating === 5 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
    </div>

    <small>{descArr[hoverRating]}</small>
```

in comparison to the old code:
```js
    const [rating, setRating] = useState(null)
    const [hoverStar, setHoverStar] = useState('blank-star star-rating')
    const [hoverRating, setHoverRating] = useState(0);
    const [desc, setDesc] = useState('Select your rating')

    useEffect(()=> {
        if (hoverRating === 1) {
            setHoverStar('yellow-star star-rating')
            setDesc('Not good')
        } else if (hoverRating === 2) {
            setHoverStar('yellow-orange-star star-rating')
            setDesc("Could've been better")
        } else if (hoverRating === 3) {
            setHoverStar('orange-star star-rating')
            setDesc("OK")
        } else if (hoverRating === 4) {
            setHoverStar('red-orange-star star-rating')
            setDesc("Good")
        } else if (hoverRating === 5) {
            setHoverStar('red-star star-rating')
            setDesc("Great")
        } else {
            setHoverStar('blank-star star-rating')
            setDesc('Select your rating')
        }
    }, [hoverRating])

    <div
    id='star5'
    onClick={() => setRating(5)}
    onMouseEnter={() => setHoverRating(5)}
    onMouseLeave={() => setHoverRating(rating)}
    >
        <i className={hoverRating === 5 ? hoverStar : 'blank-star star-rating'} />
    </div>

    <div>{desc}</div>
```

