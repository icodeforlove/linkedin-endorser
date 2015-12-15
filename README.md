# LinkedIn Automated Endorsor

## requirements

you will need at least node v5.1.0

## installation

`npm install linkedin-endorsor`

## setup

you need to obtain some legitamate session data, we only need two things

1) you will need to obtain a csrf_token, you can do this by running the following in your console while you're on a linkedin page

```javascript
$('[name="csrfToken"]').val().replace('ajax:','');
```

2) you will need to get the linked http_only cookie named `li_at` you can do this by inspecting any `linkedin.com` http request and looking at the cookie header.

3) update and rename the `config/default.example.json` to `config/default.json`

4) run `DEBUG=* npm run start`