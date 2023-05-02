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
- If new csv is selected, reinitialize all
- empty column header in papa parse
- remove ID from mapping options

- headername and its match should be managed in a 1-to-1 updatable object for convenience
- no way to modify element at -2 position of array in js ?!


- typescript
- tailwind css
- nextjs13 & app folder


- migrate to react table fully?
- migrate graphs to d3.js?
- uniformize data in context (eg. Pax/hour everywhere)

- update calculation flow (auto updates, no buttons)

- full example for security







