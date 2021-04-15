import "./MarkerForm.css";
import React from "react";

export const FormPopup = ({activeTree, setActiveTree }) => {
    return (
        <div className= {activeTree ? "form active" : "form"} onClick={() => setActiveTree(null)}>
            {activeTree &&
                <div className= "form_container" onClick={e => e.stopPropagation()} >
                    <b>{activeTree.properties["genus:ru"]}</b>
                    {<p>Высота: {activeTree.properties.height}</p>}
                    <p>{activeTree.geometry.coordinates[1]} {activeTree.geometry.coordinates[0]}</p>
                    <img src = "/img.png" width="200" height = "150" alt = "Прекрасное дерево в неплохом состоянии"></img>
                </div>
            }
        </div>
    );
}