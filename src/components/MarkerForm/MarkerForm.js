import "./MarkerForm.css";
import React from "react";

export const FormPopup = ({activeTree, setActiveTree }) => {
    return (
        <div className= {activeTree ? "form active" : "form"} onClick={() => setActiveTree(null)}>
            {activeTree &&
                <div className= "form_container" onClick={e => e.stopPropagation()} >
                    <b>{activeTree.type}</b>
                    {<p>Высота: {activeTree.treeHeight}</p>}
                    {<p>Диаметры кроны: {activeTree.diameterOfCrown}</p>}
                    <p>{activeTree.geographicalPoint.latitude} {activeTree.geographicalPoint.longitude}</p>
                    <img src = "/img.png" width="200" height = "150" alt = "Прекрасное дерево в неплохом состоянии"></img>
                </div>
            }
        </div>
    );
}