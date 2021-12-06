import "bootstrap/dist/css/bootstrap.min.css";
import { CarmenAndrade } from "./carmen andrade/methodCarmenAndrade";
import { ACI } from "./aci/aci_cmp";
import {EntryEHECarbonation } from "./entryEHE_cmp";

export function EntryValues({method}) {
  function SwitchEntry() {
    if (method === "CA") return CarmenAndrade();
    else if (method === "EHE-08") return EntryEHECarbonation();
    else if (method === "ACI-365") return ACI();
    else throw new Error("INVALID METHOD");
  }

  return SwitchEntry();
}

