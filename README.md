
# Prequisites

## Create user and database
### Local (non-docker)
Create the database and user, and set permissions with the following: 

User:
``` CREATE USER "usernameHost" WITH PASSWORD 'passwordHost'```

Database:
``` CREATE DATABASE "databaseHost" WITH OWNER="usernameHost"```

Permissions:
```GRANT ALL PRIVILEGES ON DATABASE "databaseHost" TO "usernameHost"```

Populating:
```psql -U usernameHost -d databaseHost  -a -f ./flyway/sql/V1___initial_schema.sql```
# Usage (in order)
> :information_source: The default address and its associated port is: **localhost:7777**

Useful commands (either main or test):

Access database while running in docker
```
docker exec -it database-server-test psql -U username-test database-test
```

Clear out database table(s):
```
TRUNCATE <table> RESTART IDENTITY CASCADE;
```

## Environment
The **local** environment setting is for non-docker based local running.

You can set the default environment by using:
```export ENVIRONMENT=local```

If this is not done, then this will need to set everytime.

## Local
First start the postgresql service with:
```(sudo) service postgresql start``` 

Use one the following in ```drill-and-practice```

(Assuming environment set to local):
```deno run --allow-all app-launch.js```
Otherwise:
```ENVIRONMENT=local deno run --allow-all app-launch.js```

## Containers
:information_source: **docker-compose.yml** will create a local save for the branch (can be commented out if need be). This is done in order to avoid losing the data in the database when bringing down the container. 

(--build if not already built or if needed):
```docker-compose up (--build)```

And then for downing use:
```docker-compose down```

## Credentials

### Admin account credentials
Email Address: `admin@admin.com`
Password: `123456`

### User account credentials
Email Address: `user@user.com`
Password: `pass`

# Testing

## Automated tests

### Deno tests

> :information_source: In ```quizAPI_test.js``` there are 3 tests, 2 of them are for a populated database, the uncommented one is for an unpopulated database.

For running the tests located in ```./drill-and-practice/tests/```

use the following:
```docker-compose run --rm drill-and-practice deno test --allow-all```


### Playwright (end-to-end)

:warning: Run each test file separately to avoid tests from clashing with one another. (Playwright does not support ordered testing, so the running database is shared, and you don't want that)

:information_source: Tests may need to be run a few times. Certain tests fail randomly with playwright.

```
docker-compose run --entrypoint=npx e2e-playwright playwright test <file>.spec.js && docker-compose rm -sf
```


## For manual testing
### Terminal

:information_source: It is recommended to use cookies for ease-of-use. Also, email and password can be changed.

#### Login
```curl -X POST -c cookies.txt -d "email=admin@admin.com&password=123456" localhost:7777/auth/login```

#### Creation and Deletion
```curl -X POST -b cookies.txt localhost:7777/topics/<path>```

Example:
```curl -X POST -b cookies.txt localhost:7777/topics/1/questions/2/options/1/delete ```

#### Quiz
Under construction
```curl -b cookies.txt localhost:7777/quiz/1```

### API
> :information_source: qID and oID = some number that exists within the database.

```curl localhost:7777/api/questions/random```

Will return:
```
{
  "questionId": <qID>,
  "questionText": "<question_text>?",
  "answerOptions": [
    { "optionId": <oID>, "optionText": "<option_text>" },
    { "optionId": <oID>, "optionText": "<option_text>" },
    { "optionId": <oID>, "optionText": "<option_text>" },
  ]
}
```

>
```curl -v -X POST -d '{"questionId":<qID>,"optionId":<oID>}' localhost:7777/api/questions/answer```

Will return:
```{is_correct: <true/false>}```:




