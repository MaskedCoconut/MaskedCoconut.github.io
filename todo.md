# data validation

# Define validation scheme
- flight number: has a space
- flight date : is a date
- Scheduled time: is a time
- Arr./Dep: in ['A','D']
- Int./Dom: in ['I','D']
- T1/T2 in ['T1','T2']
- Category in ['P','C',...]
- Seats is number
- Pax is number

# If all columns are matched


# Click to check validity for all data
# We change the table to:
- new headers
- validation activated
- filtered on error rows

# Filter on rows with error
# Edit and update filters


## Big steps
1. import file (select should load and the other should reload)
2. match columns
3. fix errors
4. send


# Fix some stuff
- empty column header in papa parse

- headername and its match should be managed in a 1-to-1 updatable object for convenience
- no way to modify element at -2 position of array in js ?!

- typescript
- tailwind css
- nextjs13 & app folder

- migrate to react table fully?

- full example for security
- also single page app?

Priority list:
- graph js: 2 axis, styling, draggable components
- table: highlight matched headers

- user settings for terminal (2 modes: constant/variable -- modified by )
- Create light and dracula mode to the App
- Work on UI:
  - SPA: with tabs and animations
  - Theme
  - Components clearly divided with Paper, background etc...

- default schedule, process, show-up

- gerer mieux l'ordre et le name/key des processors

- add holding area?

- add LoS

- visual cues as to what should be the next step
- tooltips (with parcimony)

- fix cases when initial value of select is wrong

advanced ideas:
- Detailed show-up (per AL/Flight groups) (each group have profile and showup)
- Pax ratio and bags ratio (per Airlines/Flight groups)









