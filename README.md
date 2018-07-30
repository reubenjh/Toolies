# Nuts & Bolts
A platform to share expensive equipment within trusted groups. EDA 2018 final project!
<img src='https://nypdecider.files.wordpress.com/2018/04/home-improvement-wilson-tim.jpg?quality=90&strip=all&strip=all'>

 ---
 
## Development notes

### User Stories
  * I can sign up
  * I can see my profile
  * I can add some of my tools to share
  * I can view other tools in the Tool Pool
  * I can view a particualr tool and see the trust framework for it
  * I can request a tool to use (email sent)
  * Once accepted, the tool's status changes

### MVP
  * Account creation
  * Add tools to profile to share
  * Edit a tool on my profile
  * Definining what trust framework to list gear under
  * Browse the tools available to use
  * Request a tool to use (email sent)
  * Change tool status between rented/available

### Stretch goals
  * Multiple groups eg Karori mountain bikers vs. wider Wellington region
  * Trust ratings Uber style
  * See tools that are currently rented
  * Forum to discuss gear that people need tips/advice with.
  * In-app messaging system
  * View others' profiles when you're logged in
  * Keeping the app safe (proof of id auth on register/credit card and bond understanding)
  * Upload photos for gear/profile
  * Modals


## Views (Client Side)
  | name | purpose |
  | --- | --- |
  | Nav | navigation bar |
  | EditProfileForm | - |
  | NewGearForm | Form fpr user to add new item of gear |
  | GearEdit | Form/Modal for editing single item |
  | GearItem | Full page view of single item |
  | GearRequest | component for requesting use of too, within GearItem |
  | ItemInGrid | single item display within GearList or ToolPool |
  | Login | View for user to enter their login credentials |
  | Register | View for user to sign up for the App |
  | Profile | View a logged in user's profile |
  | GearList | User's view of their own gear |
  | ToolPool | View all gear in the loaning group |

## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | auth | Store information regarding user logins, auth status and auth errors |
  | gear | Store the array of all gear and status of any gear fetching/saving |
  | user | Store logged-in user info, array of all gear belonging to user and all messages |


## Thunk Actions (Client Side)

Each of these actions calls on several synchronous actions on sending and receiving fetch/save requests to DB

  | name | data | purpose |
  | --- | --- | --- |
  | getGear | all gear | fetches all gear into client |
  | addGearItem | single item | saves new item to redux state and posts to server for DB saving |
  | editGearItem | update object | updates item in db and redux state |
  | setAvailability | id, boolean | sets availability of item in db and state |
  | loginUser | creds | manages login request |
  | fetchUser | callback | fetches full user profile from db for state |
  | logoutUser | - | destroys token client-side to log out |
  | registerUserRequest | new user form data | creates new user in the server and logs them in in state |
  | editProfileAction | update object | udpates user profile in db and state |
  | manageRequest | request object | manages saving emailing new request, saving to db and state in that order |
  | postRequest | request object | manages saving new request to db and state |
  | manageMessageDelete | id | manages deleting request from db and state |
  | manageMessageUpdate | id, update object | manages updating request in db and state |
  | mailRequest | request object, callback | manages email sending to user |
  
## Synchronous actions

  | type | data | purpose |
  | --- | --- | --- |
  | GEAR_REQUEST | none | notifying state that gear request is in progress |
  | SET_GEAR | gear | gear array from response into state |
  | GEAR_ERROR | err | notifying state of error in fetch |
  | REQUEST_GEAR_SAVE | none | notifying state that gear push to server is in progress |
  | GEAR_ADD | item | pushes new item to local state and alters changes saving status to false |
  | SET_USER | user | saves user info to state on login or register |


## API (Client - Server)

| Method | Endpoint | Protected | Usage | Request Data | Response |
| --- | --- | --- | --- | --- | --- |
| Post | /api/auth/login | Yes | Log In a User | credentials object | The Users JWT Token |
| Post | /api/auth/register | Yes | Register a User | registration form data | The Users JWT Token |
| Get | /api/gear/all | No | Get full list of gear | - | Array of Objects (object = A Gear Item) |
| Get | /api/gear/single/:id | No | Get a single gear item | - | A Gear Item |
| Post | /api/gear/new | Yes | Add a gear item to db | single gear object | gear item object |
| Post | /api/gear/update/:id | Yes | update gear object in DB | update info as an object | numUpdates (should be 1) |
| Delete | /api/gear/delete/:id | Yes | delete gear object | - | status 200 |

## DB (Server Side) -
 MVP has two tables -- Gear ( * - 1 ) Users

### Gear
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | increments | Unique identifier for each item |
  | name | String | name of item |
  | description | String | Description of item, condition, missing parts etc. |
  | photo_url | string | URL of a picture of the item |
  | user_id | integer | Id of the owner |
  | trustframework | string | loaning category/conditions of item |
  | status | string | availability of item for use |

### Users (Join Table M21)

 | Column Name | Data Type | Purpose |
 | --- | --- | --- |
 | id | increments | Unique identifier for each user |
 | user_name | string | Used for login |
 | first_name | string | First name |
 | last_name | string | Last name |
 | profile_pic | string | url of profile picture |
 | email_address | string | displayed for contact information |
 | hash | string | hashed login password |
 
 ### Requests (Join Table M22 (each request joins to two users)

 | Column Name | Data Type | Purpose |
 | --- | --- | --- |
 | id | increments | Unique identifier for each request |
 | gear_id | integer  | id of gear item |
 | owner_id | integer | id of owner |
 | last_name | integer | id of requesting user |
 | created_at | timestamp | timestamp created on insertion into table |
 | message | string | custom message from requester to owner |
 ---


## Setup

Run the following commands in your terminal:

```sh
yarn install
yarn knex migrate:latest
yarn knex seed:run
mv .env_example .env
```

To run in development:
```sh
yarn dev
```

To run in production:
```sh
yarn start
```

## Heroku!!!

### Deploying!

To push master branch to heroku:
```sh
yarn h:deploy
```

Heroku database scripts:
```sh
yarn h:migrate
yarn h:seed
yarn h:rollback
```

### Setting environment variables (instead of .env)
```sh
heroku config:set JWT_SECRET=somesecret
heroku config:set SENDGRID_API_KEY=key
```
### Seeding Heroku

1. You will need pgsql tools, install with ```sudo apt-get install -y postgresql-client```
2. rollback and migrate heroku with yarn h:rollback, yarn h:migrate
3. direct connect to heroku postgres db with ```heroku pg:psql```
4. look up seq tables (which keep track of next id val) : ```SELECT c.relname FROM pg_class c WHERE c.relkind = 'S';```
5. For each table run the following reset primary key: ```SELECT setval('tablename_id_seq', (SELECT max(id) FROM tablename) + 1);```
6. close direct db connection with \q
7. seed heroku with ```yarn h:seed```
8. repeat steps 3 - 6 to update primary keys
