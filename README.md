# Auth ui component
Library for creating a login form and submit login and logout to backend urls

## Methods

<a name="Auth"></a>

## Auth
**Kind**: global class  

* [Auth](#Auth)
    * [new Auth()](#new_Auth_new)
    * [.loginOnEnterKeyPress()](#Auth+loginOnEnterKeyPress)
    * [.login()](#Auth+login)
    * [.logout()](#Auth+logout)
    * [.loginModalShow()](#Auth+loginModalShow)

<a name="new_Auth_new"></a>

### new Auth()
Authentication view controller

- `options` {object} Object with the following keys
  - `selector` {object} Object with selectors
    - `form` {string} Selector for login form. Used to enable submit on
    key down.
    - `login` {string} Selector for link/button triggering login on click
    - `logout` {string} Selector for link/button triggering logout on click
    - `user` {string} Selector for user name input
    - `password` {string} Selector for password
  - `url` {object} Object containing urls
    - `login` {string} login url
    - `logout` {string} logout url
    - `redirect` {object} Login and logout redirects
      - `login` {string} if no redirect present in url
    this is where you are redirected after login
      - `logout` {string} redirected after logout

<a name="Auth+loginOnEnterKeyPress"></a>

### auth.loginOnEnterKeyPress()
Enable submit click on enter press

- `x` {object} [Rxjs](http://reactivex.io/rxjs/) object decorated with
  - `self` {object} Reference to `this`

**Kind**: instance method of <code>[Auth](#Auth)</code>  
<a name="Auth+login"></a>

### auth.login()
Login call to backend

- `x` {object} [Rxjs](http://reactivex.io/rxjs/) object decorated with
  - `self` {object} Reference to `this`

**Kind**: instance method of <code>[Auth](#Auth)</code>  
<a name="Auth+logout"></a>

### auth.logout()
Logout call to backend

- `x` {object} [Rxjs](http://reactivex.io/rxjs/) object decorated with
  - `self` {object} Reference to `this`

**Kind**: instance method of <code>[Auth](#Auth)</code>  
<a name="Auth+loginModalShow"></a>

### auth.loginModalShow()
Show pre, done or fail message during login

 - `type` {string} Can take the values `"pre"` | `"done"` | `"fail"`

**Kind**: instance method of <code>[Auth](#Auth)</code>  
## Test
`npm run-script test`

For manual test run
```
node lib/test/manual/index.js
```
Then open `lib/test/manual/html/index.html` in a browser

## Contributing
In lieu of a formal styleguide, take care to maintain the
existing coding style. Add unit tests for any new or changed
functionality. Lint and test your code.

## Release History