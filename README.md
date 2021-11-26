### React + TypeScript + Redux + Ant design

#### Calendar of events (Adding events with a choice of participants)

##### Installation => launch:
- npm i
- npm start

##### Authorization:
- login: **user**, password: **123**
- login: **admin**, password: **123**
- login: **kevin**, password: **123**

##### Application tree:
```
_**public**_
--| favicon.ico
--| index.html
--| manifest.json
--| users.json (mock server DB)

_**src**_
--| **api**
----| UserServices.ts (axios, AxiosResponse)
--| **components**
----| AppRouter.tsx
----| EventCalendar.tsx
----| EventForm.tsx
----| LoginForm.tsx
----| Navbar.tsx
--| **hooks**
----| useActions.ts (useDispatch, bindActionCreators)
----| useTypedSelector.ts (autocomplete useSelector state)
--| **models**
----| IEvent.ts
----| IUser.ts
--| **pages**
----| Event.tsx
----| Login.tsx
--| **router**
----| index.ts
--| **store**
----| **reducers**
------| **auth**
--------| actionCreators.ts
--------| index.ts (authReducer)
--------| types.ts
------| **event**
--------| actionCreators.ts
--------| index.ts (EventReducer)
--------| types.ts
------| actionsCreators.ts (all actions creators)
------| index.ts (unification reducers ./auth and ./event)
----| index.ts (store, createStore)
--| **utils**
----| date.ts (formatDate)
----| rules.ts (rules attribute for components "antd")
App.tsx
index.css
index.tsx
```
