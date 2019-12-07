import React from 'react';
import {Route, Switch} from "react-router";
import {FavoritesPage, HomePage , PetBilgileri} from "../pages";

function Main(props) {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/favoriler" component={FavoritesPage}/>
                <Route exact path="/petBilgileri/:id" component={PetBilgileri} />
            </Switch>
        </div>
    );
}

export default Main;
