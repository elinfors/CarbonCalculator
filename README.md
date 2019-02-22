# CarbonCalculator
Project in DH2642

Componenet: Login
    logga in mha tex firebase

Component: SearchTravel
    tar in användardata om fordon, startdestination, slutdestinaltion.
    här ska man även kunna ange hur många som reser för tex vid en bilfärd på 4 personer kunna dela upp koldioxidutsläppet på 4
    Ev ska antal personer i bilen vara en egen Component för att kunna ändra i efterhand 

Component: TopBar
    hamburgermeny: ska kunna navigeras vidare till my account och ha en logout-knapp

resultaten hanteras på samma sätt som menyn i DinnerPlanner, alltså de läggs in i en "menu" i modellen. 

Componenet: TravelResults
    loopar genom listan av våra sparade resultat, travelObject.
    Innehåller: knapp (alt en pop-up) Details med ett klick-event som visar detaljer om resa (destination, karta). Går till ny component

Component: TravelDetails
    innehåller detaljerad information om varje resa

Component: UserTravels
    visar de resor som vi har sparat. Sparade resorna är unika för varje användare. 