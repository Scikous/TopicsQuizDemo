# Admin account credentials
Username: ```admin@admin.com```
Password: ```123456```
# User account credentials
Username: ```user@user.com```
Password: ```pass```

# api manual testing
``` curl -v -X POST -d '{"questionId":46,"optionId":36}' localhost:7777/api/questions/answer```

# Terminal testing

```curl -X POST -c cookies.txt -d "email=user@user.com&password=pass" localhost:7777/auth/login```
```curl -v -X POST -b cookies.txt localhost:7777/topics/14/delete```

# Playwright testing
```docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf```

# Deno tests
Must be run in the drill-and-practice directory.
```docker-compose run --rm drill-and-practice deno test --allow-all```