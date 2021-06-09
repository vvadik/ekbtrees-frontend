import React, {Component} from "react"; 
import MapContain from "../Map/MapContain";



export default class MapPage extends Component{
    render(){
        return(
            <MapContain styleName="shrinkMap" />
        )
    }
}