# LinkedIn Automated Endorser

## requirements

you will need at least node v5.1.0 or if you're just looking for a script to paste in the console you can use [this](https://gist.github.com/icodeforlove/690b1a5f09c1d3f85498).

## installation

- clone the repo
- run `npm install` inside of it

## setup

you need to obtain some legitamate session data, we only need two things

- you will need to obtain a csrf_token, you can do this by running the following in your console while you're on a linkedin page `$('[name="csrfToken"]').val().replace('ajax:','');`

- you will need to get the linked **http_only** cookie named `li_at` you can do this by inspecting any `linkedin.com` http request and looking at the cookie header.

-  update and rename the `config/default.example.json` to `config/default.json`

- run `DEBUG=* npm run start`
