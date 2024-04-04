// import React from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

export default function Checkboxr() {
  return (
    <CheckboxGroup
      label="Choisire Votre Role"
      orientation="horizontal"
      color="secondary"
      defaultValue={["organisateur"]}
    >
      <Checkbox value="organisateur">Organisateur</Checkbox>
      <Checkbox value="benevole">Benevole</Checkbox>
    </CheckboxGroup>
  );
}
