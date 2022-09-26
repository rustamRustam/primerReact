import React from "react";

export interface CollectionContextInterface {
  toggleView: ()=>void;
}

export const CollectionContext = React.createContext<CollectionContextInterface>({
  toggleView: () => {console.log("Base toggleView");},
});
