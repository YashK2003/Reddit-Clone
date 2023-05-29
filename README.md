# Greddiit 

Reddit clone built with MERN stack.

## Prerequisites
You have to install Node.js and React JS in your machine.


** **
## Installing
- frontend : npm start (` Runs on port 3000 `)
- backend : node server.js (` Runs on port 4000 `)
- For making docker image : `docker-compose up` in parent directory

** ** 

## Features


### Login and Registration
1. A registration page and login portal for the users.
2. Logout option.
3. Authentication & Authorization of the details of the user.
4. Implemented Login Using Google API (partially working). 
5. Input Validation is being done. If input is invalid the button is disabled.

**  **

<b> Note: Assumed that email is unique. </b>

** ** 
```Upon login the user is redirected to main page. Links to  various other pages are provided in the navbar.```    

**  **
### Profile Page
1. Contains basic details of the User with an Option to edit the details
2. A list of followers and followings displayed
3. User is able to delete the followers or followings by clicking on the delete icon beside the name of the follower. 

** ** 

### My Sub Greddiits Page
1. Button to create a new Sub Greddiit.
2. A newly created Sub Greddiit has 1 follower by default, the creator itself.
3. The page consists of list of all the existing Sub Greddiits (of which the user is moderator).
4. Each subgreddit card contains all the details related to the subgreddit.
5. Delete button provided to delete the subgreddit and all the related posts, reports, etc.
6. Also contains an Open Button which when clicked Opens the Web Page for that SubGreddiit.
7.  When specific page related to subgreddit is opened url is changed with its ID.

** ** 
```Upon clicking the open button the user is navigated to a blank page with keyboard shortcuts written and links in the navbar given to proceed further```    

** ** 
```The Navbar contains link to four pages:```
```1. Users ```
```2. Joining Request Page ```
```3. Stats ```
```4. Reported Page ```
** ** 

### Users Page
1. shows list of users which are blocked and which are not blocked

** ** 

### Joining Requests Page
1. Shows the list of Joining Requests of all the Users who have requested to Join the Sub Greddiit in Context. 
2. Button to accept the user
3. Button to reject the user

** ** 
### Stats
Contains four graphs as follows:
1. Growth of the sub greddiit in terms of members over time
2. Number of daily posts vs date
3. Number of daily visitors vs date (visitors are counted by the number of people clicking the sub greddiit link)
4. Number of reported posts vs actually deleted posts based on reports on each date

** ** 
### Reported Page
1. Contains all the reports that have been
made so far on the Sub Greddiit with all the related details
2. Option to block the user 
- implemented the button with 5 sec timer
- if blocked the name of the person who posted is now replaced with the name of “Blocked User” 
- The moderator of Sub Grediit will still see the original name when viewing the list of Reports
3. Option to delete the post
- a report if not handled for 10 days then this request is removed without doing any action.
4. Option to Ignore the post
- Ignore will fade out other buttons
** ** 

### Sub Greddiits Page
1. The page consists of list of all the existing Sub Greddiits.
2. The page consists Search Bar, where one can search for a Sub Greddiit based upon its Name
- Implemented Fuzzy Search also
3. Implemented a filter based on the tags of the Sub Greddiit.
4. Implemented Sort based on
- Name
- Followers
- Creation Date
5. First the page showed Joined Sub Greddiits with each being a clickable item. 
6. For these Joined Sub Greddiits their is a Leave Button, clicking on which will immediately kick the user out of it.
- Once a user leaves a Sub Greddiit you cannot send a join request to that Sub Greddiit again.
- In case the user who have left a Sub Greddiit before and is trying to join it again then an alert is poped up displaying the relevant message
- If the current user is the moderator of that Sub Greddiits, the button is disabled. 
 
** ** 
```On clicking a Sub Greddiit, the user is redirected to a page where on the left side their is an Image, Name, Description associated with the clicked Sub Greddiit. ```
** ** 
### Specific Sub Greddiit Page
1. Create Post Button to create posts
2. Contains all the posts that have been posted until now.(All the Posts are text based)
3. Posts contain the following features
- Buttons for Upvoting and Downvoting
- Commenting feature
- save button to save the post for later reference
- follow button, wherein a user can follow the user who posted that specific post.
4. While creating a post, if the post contains some specific words (The Banned Words which were added when the Sub Greddiit was being created), then an alert is popped with the message that the post contains banned keywords
** ** 
### Saved Post Page
1. All the Posts that have been saved by the logged in User
2. Button to remove the post from saved ones
** ** 

## Built With

* Node Js  - The Backend
* React JS - The Frontend
* NPM      - Dependency Management
* MONGODB  - For storing the user information and chats

** ** 
## Contribute
Contributions are always welcome! 😇
Feel free to add more features to the site 😁.