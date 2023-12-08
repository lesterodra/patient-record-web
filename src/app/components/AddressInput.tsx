import { updatePatientInformationInput } from "@/redux/features/patient-slice";
import { AppDispatch } from "@/redux/store";
import phProvinceCityBarangay from "@/utils/phProvinceCityBarangay";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddressInput = () => {
  const [cityMunicipalityList, setCityMunicipalityList] = useState<any[]>([]);
  const [barangayList, setBarangayList] = useState<any[]>([]);
  const list: { [key: string]: any } = phProvinceCityBarangay;
  const dispatch = useDispatch<AppDispatch>();

  const provinces: any[] = [];
  Object.keys(phProvinceCityBarangay).forEach((key) => {
    const regionProvinces = Object.keys(list[key].province_list).map(
      (provinceKey) => ({
        name: provinceKey,
        municipalities: Object.keys(
          list[key].province_list[provinceKey].municipality_list
        ).map((municipalityKey) => ({
          name: municipalityKey,
          barangayList:
            list[key].province_list[provinceKey].municipality_list[
              municipalityKey
            ].barangay_list,
        })),
      })
    );
    provinces.push(...regionProvinces);
  });

  const onSelectedProvinceChange = (e: any) => {
    dispatch(
      updatePatientInformationInput({
        province: e.target.value,
      })
    );
    setCityMunicipalityList(
      provinces.find((province) => province.name === e.target.value)
        .municipalities
    );
    setBarangayList([]);
  };

  const onSelectedMunicipalityChange = (e: any) => {
    dispatch(
      updatePatientInformationInput({
        municipality: e.target.value,
      })
    );
    setBarangayList(
      cityMunicipalityList.find(
        (cityMunicipality) => cityMunicipality.name === e.target.value
      ).barangayList
    );
  };

  const onSelectedBarangayChange = (e: any) => {
    dispatch(
      updatePatientInformationInput({
        barangay: e.target.value,
      })
    );
  };

  provinces.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex gap-x-10 gap-y-3 flex-wrap">
      <div>
        <p>Province</p>
        <select className="rounded w-60" onChange={onSelectedProvinceChange}>
          <option></option>
          {provinces.map((province) => (
            <option key={province.name} value={province.name}>
              {province.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>City/Municipality</p>
        <select
          className="rounded w-60"
          onChange={onSelectedMunicipalityChange}
        >
          <option>Select City/Municipality</option>
          {cityMunicipalityList.map((cityMunicipality) => (
            <option key={cityMunicipality.name} value={cityMunicipality.name}>
              {cityMunicipality.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Barangay</p>
        <select className="rounded w-60" onChange={onSelectedBarangayChange}>
          <option>Select Barangay</option>
          {barangayList.map((barangay) => (
            <option key={barangay} value={barangay}>
              {barangay}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Address line 1</p>
        <input
          type="text"
          className="rounded"
          onBlur={(e) => {
            dispatch(
              updatePatientInformationInput({
                address: e.target.value,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(AddressInput);
