# to do list

- empty column header in papa parse

- headername and its match should be managed in a 1-to-1 updatable object for convenience

- typescript
- tailwind css
- nextjs13 & app folder

- table: highlight matched headers

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
- icons


- fix cases when initial value of select is wrong (showup)
- no input on route if only one child
- reorganize show-up charts (move up, down, first, last)

- load should refresh terminal steps and all
- change in % should recalculate results

advanced ideas:
- Detailed show-up (per AL/Flight groups) (each group have profile and showup)
- Pax ratio and bags ratio (per Airlines/Flight groups)
- Histogram view for queueing time distribution

 notes on runSecurity:

 1. start at currentfacilities = [show up]
 2. loop through the list of currentFacilitie
    1. create nextFacilities = []
    2. loop through the list of their currentFacilities'children
       1. calculate all bases on routes (if no route, 100%)
       2. nextFacilities.push(child)




