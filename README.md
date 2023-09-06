
# Usage (in order)
the default address is: **localhost:7777**

## Environment
!The environment needs to be set. 

There are two environments: **main** and **test**, run whichever one you wish to be working on.

You can set the default environment by using:
```export ENVIRONMENT=<main/test>```

If you do not do this, you will need to set everytime you start/build the container.

## Containers
NOTE: docker-compose.yml will create a local save for **test** and **main**, when they are built to avoid losing the database data when switching between the two. 

If you have set the default environment already, then you can use (--build if not already built or if needed):
```docker-compose up (--build)```

Otherwise you need to use:
```ENVIRONMENT=<main/test> docker-compose up (--build)```

And then for downing use:
```docker-compose down```

## Credentials

### Admin account credentials
Username: `admin@admin.com`
Password: `123456`

### User account credentials
Username: `user@user.com`
Password: `pass`

## Testing

## Automated tests

### Deno tests
For running the tests located in ```./drill-and-practice/tests/``` use:
```docker-compose run --rm drill-and-practice deno test --allow-all```


### Playwright (end-to-end)

`docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf`


## For manual testing
### Terminal

NOTE: It is recommended to use cookies to be able to easily do different actions.

#### Login
```curl -X POST -c cookies.txt -d "email=<email address>&password=<password>" localhost:7777/auth/login```

#### Creation and Deletion
```curl -X POST -b cookies.txt localhost:7777/topcis/<path>```

Example:
```curl -X POST -b cookies.txt localhost:7777/topics/1/questions/2/options/1/delete ```

#### Quiz
```curl -b cookies.txt localhost:7777/quiz/:id```

### API
qID and oID = some number that exists within the database.

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


```curl -v -X POST -d '{"questionId":<qID>,"optionId":<oID>}' localhost:7777/api/questions/answer```

Will return:
```{is_correct: <true/false>}```:




