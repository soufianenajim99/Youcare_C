import { RadioGroup, Radio } from "@nextui-org/react";

export default function Radiogroup() {
  return (
    <RadioGroup label="Choisire Votre Role" orientation="horizontal">
      <Radio value="organisateur">Organisateur</Radio>
      <Radio value="benevole">Benevole</Radio>
    </RadioGroup>
  );
}
